import { FormControl, ValidationErrors } from '@angular/forms';

export function strictNumericValidator(control: FormControl): ValidationErrors | null {
  const value = control.value?.toString();

  if (!value) {
    return null;
  }

  const regex = /^[0-9]+$/;

  return !value.match(regex) ? { pattern: true } : null;
}
