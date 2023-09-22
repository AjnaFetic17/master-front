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

  getPresignedUrl(id: string): Observable<string> {
    return this.http.get<string>(`/api/files/${id}`);
  }

  markAsUploaded(file: File): Promise<ScanResult> {
    return lastValueFrom(this.http.post<ScanResult>(`/api/files/`, file));
  }

  async getPrediction(fileUpload: File): Promise<ScanResult | undefined> {
    try {
      this.scansStore.update({ uploadProgress: 0 });
      const formData = new FormData();
      formData.append('file', fileUpload, fileUpload.name);

      const response = await this.http
        .post('/api/upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          map((event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
              this.scansStore.update((state) => ({
                ...state,
                uploadProgress: Math.round((100 / event.total) * event.loaded),
              }));
            }
          })
        );
      const fileObservables$ = await this.uploadFile(formData).pipe(
        tap((scan) => {
          this.scansStore.update((state) => ({
            file: scan,
          }));
        })
      );
      // const response = await this.http
      //   .post<ScanResult>('/api/upload', formData, {
      //     reportProgress: true,
      //     observe: 'events',
      //   })
      //   .pipe(
      //     map((event: any) => {
      //       Math.round((100 / event.total) * event.loaded);
      //       if (event.type == HttpEventType.UploadProgress) {
      //         console.log(Math.round((100 / event.total) * event.loaded));
      //         this.scansStore.update({
      //           uploadProgress: Math.round((100 / event.total) * event.loaded),
      //         });
      //       }
      //     })
      //   );

      return fileObservables$.toPromise();

      // if (response._response.status === 201) {
      //   return await this.markAsUploaded({
      //     name: file.name,
      //     size: file.size,
      //     mimeType: file.type || 'unknown',
      //     storageIdentifier: azureName,
      //   });
      // }
    } catch (error) {
      return undefined;
    }
  }
}
