import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { LogoutButtonComponent } from './logout-button.component';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;
  let authMock: { logout: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authMock = { logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [LogoutButtonComponent],
      providers: [{ provide: AuthService, useValue: authMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ruft AuthService.logout mit returnTo Origin auf', () => {
    component.logout();
    expect(authMock.logout).toHaveBeenCalledWith({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  });
});
