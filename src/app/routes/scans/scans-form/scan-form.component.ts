import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ScanResult, ScansService } from '../state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/validation.service';
import { replaceEmptyStringsWithNull } from 'src/app/shared/helpers/replace-empty-strings-with-null';
import { strictRequiredValidator } from 'src/app/shared/validators';
import {
  Observable,
  Subject,
  catchError,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { ScansQuery } from '../state/scans.query';

@Component({
  selector: 'unet-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss'],
})
export class ScanFormComponent implements OnInit, OnDestroy {
  @Input() disabled!: boolean;
  @Output() save = new EventEmitter<any>();

  private destroy$ = new Subject<void>();

  uploadProgress$ = this.scansQuery.select((state) => state.uploadProgress);

  form!: FormGroup;
  file$ = this.scansQuery.select((state) => state.file);
  file: boolean = false;
  uploadInProgress = false;

  constructor(
    private scansQuery: ScansQuery,
    public validationService: ValidationService,
    private formBuilder: FormBuilder,
    private scansService: ScansService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      examinationDate: [null, Validators.required],
      comment: null,
      noFile: false,
      file: null,
      documentNumber: [null, strictRequiredValidator],
    });

    //this.form.patchValue({ ...this.item });

    if (this.disabled) {
      this.form.disable();
    }

    this.form.valueChanges.pipe(takeUntil(this.destroy$));
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['item'] && this.item) {
  //     this.employees = [
  //       ...(this.item.employeeIds?.map(
  //         (employeeId: string) => this.employeesQuery.getEntity(employeeId)!
  //       ) || []),
  //     ];
  //     this.service = this.item?.serviceId
  //       ? { ...this.servicesQuery.getEntity(this.item.serviceId)! }
  //       : undefined;
  //     this.file = this.item.file;

  //     this.form.markAsUntouched();
  //     this.form.patchValue({
  //       ...this.item,
  //       documentNumber: this.file?.documentNumber || null,
  //     });
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onFileSelected(event: Event): Promise<void> {
    const selectedFile = (event.currentTarget as HTMLInputElement).files?.[0];

    if (selectedFile) {
      this.uploadInProgress = true;
      await this.scansService.getPrediction(selectedFile).finally(() => {
        this.file = true;
        this.uploadInProgress = false;
      });
    }
    console.log(this.uploadInProgress);
  }
}
