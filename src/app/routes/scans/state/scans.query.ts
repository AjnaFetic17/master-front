import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ScansState, ScansStore } from './scans.store';
import { ScanResult } from './scans.models';

@Injectable({ providedIn: 'root' })
export class ScansQuery extends QueryEntity<ScansState, ScanResult> {
  constructor(protected override store: ScansStore) {
    super(store);
  }
}
