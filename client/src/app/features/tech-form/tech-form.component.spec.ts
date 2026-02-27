import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechFormComponent } from './tech-form.component';

describe('TechFormComponent', () => {
  let component: TechFormComponent;
  let fixture: ComponentFixture<TechFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
