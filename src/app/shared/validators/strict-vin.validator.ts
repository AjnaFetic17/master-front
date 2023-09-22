import { FormControl, ValidationErrors } from '@angular/forms';

export function strictVINValidator(
  control: FormControl
): ValidationErrors | null {
  const value = control.value?.toString();

  if (!value) {
    return null;
  }

  const regex = /^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]*$/gm;

  return !value.match(regex) ? { pattern: true } : null;
}
