import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ScansComponent } from './scans/scans.component';
import { SharedModule } from '../shared/shared.module';
import { ScanFormComponent } from './scans/scans-form/scan-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ScanPreviewComponent } from './scans/scan-preview/scan-preview.component';

@NgModule({
  declarations: [ScansComponent, ScanFormComponent, ScanPreviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes, { scrollPositionRestoration: 'enabled' }),
    SharedModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
})
export class RoutesModule {}
