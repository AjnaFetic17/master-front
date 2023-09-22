import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  getError(control: AbstractControl | null): string {
    const errors = {
      max: 'Invalid input',
      min: 'Invalid input',
      minlength: 'Input too short',
      pattern: 'Invalid input',
      required: 'This field is required',
    };

    for (const [key, value] of Object.entries(errors)) {
      if (control?.hasError(key)) {
        return `${value}`;
      }
    }
    return '';
  }
}
