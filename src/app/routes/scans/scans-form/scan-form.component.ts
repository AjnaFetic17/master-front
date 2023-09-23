import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ScanResult, ScansService } from '../state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/core/validation.service';
import { replaceEmptyStringsWithNull } from 'src/app/shared/helpers/replace-empty-strings-with-null';
import { strictRequiredValidator } from 'src/app/shared/validators';
import { Subject, takeUntil } from 'rxjs';
import { ScansQuery } from '../state/scans.query';
import { ScansStore } from '../state/scans.store';

@Component({
  selector: 'unet-scan-form',
  templateUrl: './scan-form.component.html',
  styleUrls: ['./scan-form.component.scss'],
})
export class ScanFormComponent implements OnInit, OnDestroy {
  @Input() disabled!: boolean;
  @Output() save = new EventEmitter<any>();
  imageURL?: string;

  private destroy$ = new Subject<void>();

  uploadProgress$ = this.scansQuery.select((state) => state.uploadProgress);

  form!: FormGroup;
  file$ = this.scansQuery.select((state) => state.file);
  file: boolean = false;
  uploadInProgress = false;

  constructor(
    private scansQuery: ScansQuery,
    private scansStore: ScansStore,
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

    if (this.disabled) {
      this.form.disable();
    }

    this.form.valueChanges.pipe(takeUntil(this.destroy$));
  }

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

      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.scansStore.update((state) => ({
          ...state,
          scan: e.target.result,
        }));
      };

      reader.readAsDataURL(selectedFile!);
    }
  }
}
