import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { RadarComponent } from './features/radar/radar.component';
import { AuthGuard } from '@auth0/auth0-angular';
import {HomeComponent} from './features/home/home.component';
import {RadarAdministrationComponent} from './features/admin/radar-administration.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', title: 'Home', component: HomeComponent },
      { path: 'radar', title: 'Radar', component: RadarComponent },
      { path: 'radar-admin', title: 'Radar Administration', component: RadarAdministrationComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
