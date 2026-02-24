import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarAdministrationComponent } from './radar-administration.component';

describe('RadarAdministrationComponent', () => {
  let component: RadarAdministrationComponent;
  let fixture: ComponentFixture<RadarAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarAdministrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarAdministrationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
