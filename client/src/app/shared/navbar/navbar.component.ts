import { Component } from '@angular/core';
import { LogoutButtonComponent } from '../../core/logout-button/logout-button.component';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LogoutButtonComponent, RouterLink],
  template: `
    <div class="navbar bg-primary shadow-sm">
      <div>
        <a routerLink="/home" class="btn btn-ghost text-2xl">Home</a>
      </div>
      <div class="flex-1">
        <a routerLink="/radar" class="btn btn-ghost text-2xl">Radar</a>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-lg dropdown-content bg-base-2 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Settings</a></li>
            <li><app-logout-button /></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {

}
