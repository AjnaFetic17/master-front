import { ScansComponent } from './scans/scans.component';

export const Routes = [
  {
    path: '',
    component: ScansComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
