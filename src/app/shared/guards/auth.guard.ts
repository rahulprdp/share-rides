import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AppService } from '../services/app.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _app = inject(AppService);
  const router = inject(Router);

  if (_app.getUser()) {
    return true;
  }

  return router.createUrlTree(['']);
};