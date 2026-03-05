import {Component, computed, ElementRef, inject, ViewChild} from '@angular/core';
import { LogoutButtonComponent } from '../../core/logout-button/logout-button.component';
import {RouterLink} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import {toSignal} from '@angular/core/rxjs-interop';
import {ROLE_CLAIM} from '../constants/tech-radar.constatns';

@Component({
  selector: 'app-navbar',
  imports: [LogoutButtonComponent, RouterLink],
  template: `
    <div class="navbar bg-primary text-primary-content shadow-sm">
      <div>
        <a data-cy="nav-home" routerLink="/" class="btn btn-ghost text-primary-content text-2xl">Home</a>
      </div>
      <div class="flex-1">
        <a data-cy="nav-radar" routerLink="/radar" class="btn btn-ghost text-primary-content text-2xl">Radar</a>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <div #dropdownTrigger data-cy="nav-avatar-dropdown" tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            data-cy="nav-dropdown-menu"
            tabindex="-1"
            class="menu menu-lg dropdown-content bg-base-200 text-base-content rounded-box z-[999] mt-3 w-52 p-2 shadow">
            @if (isAdmin()) {
              <li><a data-cy="nav-admin-link" routerLink="/radar-admin" (click)="closeDropdown()">Radar Admin</a></li>
            }
            <li><app-logout-button /></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {
  @ViewChild('dropdownTrigger') dropdownTrigger!: ElementRef<HTMLElement>;

  private auth = inject(AuthService);

  currentUser = toSignal(this.auth.user$);

  isAdmin = computed(() => {
    const roles = this.currentUser()?.[ROLE_CLAIM];
    return Array.isArray(roles) && roles.includes('admin');
  });

  closeDropdown() {
    this.dropdownTrigger?.nativeElement.blur();
    (document.activeElement as HTMLElement)?.blur();
  }
}
