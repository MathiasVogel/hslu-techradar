import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TechFormComponent } from './tech-form.component';
import { TechService } from '../../core/tech-service/tech.service';
import { TechFormMode } from '../../shared/constants/tech-radar.constatns';
import { TechnologyDTO } from '../../core/api/api.types';

describe('TechFormComponent (vitest)', () => {
  let fixture: ComponentFixture<TechFormComponent>;
  let component: TechFormComponent;
  let mockTechService: {
    formMode: ReturnType<typeof signal<TechFormMode>>;
    createTechnology: ReturnType<typeof vi.fn>;
    updateTechnology: ReturnType<typeof vi.fn>;
  };

  const baseTech = {
    id: '1',
    name: 'React',
    category: 'LANGUAGES_AND_FRAMEWORKS',
    ring: 'ADOPT',
    description: 'UI Library',
    justification: 'Popular choice',
    published: false,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  } as unknown as TechnologyDTO;

  beforeEach(async () => {
    mockTechService = {
      formMode: signal<TechFormMode>(TechFormMode.CREATE),
      createTechnology: vi.fn(),
      updateTechnology: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TechFormComponent],
      providers: [{ provide: TechService, useValue: mockTechService as unknown as TechService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('aktiviert im Create-Mode alle Felder und entfernt optionale Validatoren', () => {
    mockTechService.formMode.set(TechFormMode.CREATE);
    fixture.detectChanges();

    const { name, category, description, justification, ring } = component.techForm.controls;
    expect(name.enabled).toBe(true);
    expect(category.enabled).toBe(true);
    expect(description.enabled).toBe(true);
    expect(justification.hasValidator(Validators.required)).toBe(false);
    expect(ring.hasValidator(Validators.required)).toBe(false);
  });

  it('setzt im Publish-Mode Required/MinLength und deaktiviert Stammdaten', () => {
    fixture.componentRef.setInput('editData', baseTech);
    mockTechService.formMode.set(TechFormMode.PUBLISH);
    fixture.detectChanges();

    const { name, category, description, justification, ring } = component.techForm.controls;
    expect(name.disabled).toBe(true);
    expect(category.disabled).toBe(true);
    expect(description.disabled).toBe(true);

    justification.setValue('test');
    justification.updateValueAndValidity();
    ring.setValue('');
    ring.updateValueAndValidity();

    expect(ring.errors?.['required']).toBeTruthy();
  });

  it('deaktiviert Ring/Begründung im Edit-Info-Mode und entfernt Ring-Validatoren', () => {
    fixture.componentRef.setInput('editData', baseTech);
    mockTechService.formMode.set(TechFormMode.EDIT_INFO);
    fixture.detectChanges();

    const { ring, justification } = component.techForm.controls;
    expect(ring.disabled).toBe(true);
    expect(justification.disabled).toBe(true);
    expect(ring.hasValidator(Validators.required)).toBe(false);
  });

  it('ruft createTechnology mit rohem Formularwert im Create-Mode auf', () => {
    const closeSpy = vi.spyOn(component, 'closeModal').mockImplementation(() => {});

    component.techForm.setValue({
      name: 'Vue',
      category: 'TOOLS',
      ring: 'TRIAL',
      description: 'Another UI framework',
      justification: '',
      published: false
    });

    component.onSubmit();

    expect(mockTechService.createTechnology).toHaveBeenCalledWith({
      name: 'Vue',
      category: 'TOOLS',
      ring: 'TRIAL',
      description: 'Another UI framework',
      justification: undefined,
      published: false
    });
    expect(mockTechService.updateTechnology).not.toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('ruft updateTechnology im Publish-Mode mit published=true auf', () => {
    const closeSpy = vi.spyOn(component, 'closeModal').mockImplementation(() => {});

    fixture.componentRef.setInput('editData', baseTech);
    mockTechService.formMode.set(TechFormMode.PUBLISH);
    fixture.detectChanges();

    component.techForm.controls.justification.setValue('Mindestens zehn Zeichen');
    component.techForm.controls.ring.setValue('TRIAL');

    component.onSubmit();

    expect(mockTechService.updateTechnology).toHaveBeenCalledWith(baseTech.id, expect.objectContaining({
      name: baseTech.name,
      category: baseTech.category,
      description: baseTech.description,
      ring: 'TRIAL',
      justification: 'Mindestens zehn Zeichen',
      published: true
    }));
    expect(mockTechService.createTechnology).not.toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('macht bei invalidem Formular nichts', () => {
    mockTechService.formMode.set(TechFormMode.CREATE);
    component.techForm.patchValue({
      name: '',
      category: '',
      description: ''
    });

    component.onSubmit();

    expect(mockTechService.createTechnology).not.toHaveBeenCalled();
    expect(mockTechService.updateTechnology).not.toHaveBeenCalled();
  });

  it('resetet das Formular auf Defaults, wenn keine editData gesetzt ist', () => {
    const closeDialog = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({ close: closeDialog } as any);

    component.techForm.setValue({
      name: 'Temp',
      category: 'TOOLS',
      ring: 'ADOPT',
      description: 'Tmp',
      justification: 'Why',
      published: true
    });

    component.closeModal();

    expect(closeDialog).toHaveBeenCalled();
    expect(component.techForm.getRawValue()).toEqual({
      name: '',
      category: '',
      ring: '',
      description: '',
      justification: '',
      published: false
    });
  });

  it('resetet das Formular auf editData-Werte, wenn vorhanden', () => {
    const closeDialog = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({ close: closeDialog } as any);

    fixture.componentRef.setInput('editData', { ...baseTech, justification: 'Already set' });
    mockTechService.formMode.set(TechFormMode.EDIT_INFO);
    fixture.detectChanges();

    component.techForm.patchValue({ name: 'Changed', description: 'Changed desc' });

    component.closeModal();

    const values = component.techForm.getRawValue();
    expect(values.name).toBe(baseTech.name);
    expect(values.category).toBe(baseTech.category);
    expect(values.ring).toBe(baseTech.ring);
    expect(values.description).toBe(baseTech.description);
    expect(values.justification).toBe('Already set');
  });
});
