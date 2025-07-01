import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./password-generator/password-generator').then(
        (c) => c.PasswordGenerator,
      ),
  },
];
