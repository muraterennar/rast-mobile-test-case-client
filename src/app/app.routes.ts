import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home-page/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'prefix',
  }
];
