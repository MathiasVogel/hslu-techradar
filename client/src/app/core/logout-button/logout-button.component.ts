import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  imports: [],
  standalone: true,
  template: `
    <button
      data-cy="nav-logout"
      (click)="logout()"
      class="btn btn-ghost text-base-content"
    >
      Log Out
    </button>
  `
})
export class LogoutButtonComponent {
  private auth = inject(AuthService);

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
}
