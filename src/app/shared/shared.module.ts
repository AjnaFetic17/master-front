import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

const Components = [ConfirmationModalComponent];

@NgModule({
  declarations: [Components],
  imports: [RouterModule],
  exports: [Components, RouterModule],
})
export class SharedModule {}
