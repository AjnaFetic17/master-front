import { FormControl, ValidationErrors } from '@angular/forms';

export function strictRequiredValidator(control: FormControl): ValidationErrors | null {
  return !control.value?.trim().length ? { required: true } : null;
}
