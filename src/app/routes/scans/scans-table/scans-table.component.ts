import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScanResult } from '../state/scans.models';

@Component({
  selector: 'unet-scans-table',
  templateUrl: './scans-table.component.html',
  styleUrls: ['./scans-table.component.scss'],
})
export class ScansTableComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() scans!: Array<ScanResult>;
  //head = carTableHeaders;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}
