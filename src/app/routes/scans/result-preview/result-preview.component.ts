import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'unet-result-preview',
  templateUrl: './result-preview.component.html',
  styleUrls: ['./result-preview.component.scss'],
})
export class ResultPreviewComponent implements OnInit {
  @Input()
  found!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
