import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScanResult } from './scans.models';
import { Observable, lastValueFrom, map, takeUntil, tap } from 'rxjs';
import { ScansStore } from './scans.store';

@Injectable({ providedIn: 'root' })
export class ScansService {
  constructor(private scansStore: ScansStore, private http: HttpClient) {}

  uploadFile(file: FormData): Observable<ScanResult> {
    return this.http.post<ScanResult>('/api/upload', file);
  }

  async getPrediction(fileUpload: File): Promise<ScanResult | undefined> {
    try {
      this.scansStore.update({ uploadProgress: 0 });
      const formData = new FormData();
      formData.append('file', fileUpload, fileUpload.name);
      const response = await lastValueFrom(
        this.http
          .post('/api/upload', formData, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            tap((event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                const progress = Math.round((100 / event.total) * event.loaded);
                this.scansStore.update({ uploadProgress: progress });
              }
            })
          )
      );

      const fileObservables$ = await this.uploadFile(formData).pipe(
        tap((scan: any) => {
          let img = 'data:image/png;base64,' + scan.image;
          this.scansStore.update((state) => ({
            ...state,
            file: {
              found: scan.found,
              imageB64: img,
            },
          }));
        })
      );

      return fileObservables$.toPromise();
    } catch (error) {
      return undefined;
    }
  }
}
