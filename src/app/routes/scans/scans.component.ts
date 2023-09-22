import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ScanResult, ScansService } from './state';

@Component({
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.scss'],
})
export class ScansComponent implements OnInit {
  //scans$ = this.scansService.getscans() as Observable<ScanResult[]>;
  scan$!: Observable<ScanResult | null>;

  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;

  idToDelete?: string;

  constructor(
    private scansService: ScansService //private toastManager: ToastManager
  ) {}

  ngOnInit(): void {}

  // changeModalStatus(event: boolean) {
  //   this.isModalOpen = !this.isModalOpen;
  //   if (event) {
  //     this.scans$ = this.scansService.getscans();
  //   }
  // }

  // isConfirmed(event: boolean) {
  //   if (event === true && this.idToDelete) {
  //     this.scansService.deleteScanResult(this.idToDelete!).subscribe();
  //     this.scans$ = this.scansService.getscans();
  //   }
  //   this.isConfirmModalOpen = !this.isConfirmModalOpen;
  // }

  // delete(id: string): void {
  //   this.isConfirmModalOpen = !this.isConfirmModalOpen;
  //   this.idToDelete = id;
  // }

  // createOrEdit(carId: string | undefined): void {
  //   if (carId) {
  //     this.car$ = this.scansService
  //       .getScanResultById(carId)
  //       .pipe(tap(() => (this.isModalOpen = true)));
  //   } else {
  //     this.car$ = of(null);
  //     this.isModalOpen = true;
  //   }
  // }
}
