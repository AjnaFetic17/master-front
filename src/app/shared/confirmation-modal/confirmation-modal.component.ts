import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'unet-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() isModalOpen!: boolean;
  @Output() confirm = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
