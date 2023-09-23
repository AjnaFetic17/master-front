import { Component, Input, OnInit } from '@angular/core';
import { ScansQuery } from '../state/scans.query';

@Component({
  selector: 'unet-scan-preview',
  templateUrl: './scan-preview.component.html',
  styleUrls: ['./scan-preview.component.scss'],
})
export class ScanPreviewComponent implements OnInit {
  @Input()
  src!: string;
  constructor(private scansQuery: ScansQuery) {}

  ngOnInit(): void {}
}
