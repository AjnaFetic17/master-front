import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ScanResult, ScansService } from './state';
import { ScansQuery } from './state/scans.query';

@Component({
  templateUrl: './scans.component.html',
  styleUrls: ['./scans.component.scss'],
})
export class ScansComponent implements OnInit {
  //scans$ = this.scansService.getscans() as Observable<ScanResult[]>;
  scan$ = this.scansQuery.select((state) => state.scan);
  file$ = this.scansQuery.select((state) => state.file);
  displayPrediction = false;
  constructor(private scansQuery: ScansQuery) {}

  ngOnInit(): void {}
}
