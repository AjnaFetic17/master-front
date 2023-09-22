import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';
import { ScansTableComponent } from './scans/scans-table/scans-table.component';
import { ScansComponent } from './scans/scans.component';
import { SharedModule } from '../shared/shared.module';
import { ScanFormComponent } from './scans/scans-form/scan-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [ScansComponent, ScansTableComponent, ScanFormComponent],
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
