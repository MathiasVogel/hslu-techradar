import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  imports: [],
  standalone: true,
  template: `
    <button
      (click)="loginWithRedirect()"
      class="button login"
    >
      Log In
    </button>
  `
})
export class LoginButtonComponent {
  private auth = inject(AuthService);

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}
