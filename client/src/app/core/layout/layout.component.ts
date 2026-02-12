import { Component } from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ``,
})
export class LayoutComponent {

}
