import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ScanResult } from './scans.models';

export interface ScansState extends EntityState<ScanResult> {
  file: ScanResult;
  uploadProgress: number;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'scan' })
export class ScansStore extends EntityStore<ScansState, ScanResult> {
  constructor() {
    super({
      file: undefined,
      uploadProgress: 0,
    });
  }
}
