import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { ROLE_CLAIM } from '../../shared/constants/tech-radar.constatns';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    map(user => {
      const roles = user?.[ROLE_CLAIM];
      if (Array.isArray(roles) && roles.includes('admin')) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};

