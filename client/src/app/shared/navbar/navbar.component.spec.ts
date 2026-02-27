import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ROLE_CLAIM } from '../constants/tech-radar.constatns';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authMock: { user$: any; logout: any };

  beforeEach(async () => {
    authMock = { user$: of({}), logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('Liefert isAdmin=false wenn keine Admin-Rolle vorhanden ist', () => {
    fixture.detectChanges();
    expect(component.isAdmin()).toBe(false);
  });

  it('Liefert isAdmin=true wenn Admin-Rolle vorhanden ist', async () => {
    authMock.user$ = of({ [ROLE_CLAIM]: ['admin'] });
    const adminFixture = TestBed.createComponent(NavbarComponent);
    const adminComponent = adminFixture.componentInstance;
    adminFixture.detectChanges();
    expect(adminComponent.isAdmin()).toBe(true);
  });
});
