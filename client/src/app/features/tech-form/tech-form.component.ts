import {Component, effect, inject, input} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {TechnologyDTO} from '../../core/api/api.types';
import {CATEGORIES, RINGS, TechFormMode} from '../../shared/constants/tech-radar.constatns';
import {TechLabelPipe} from '../../shared/pipes/tech-label-pipe';
import {TechService} from '../../core/tech-service/tech.service';

@Component({
  selector: 'app-tech-form',
  standalone: true,
  imports: [ReactiveFormsModule, TechLabelPipe, DatePipe],
  templateUrl: './tech-form.component.html',
  styles: ``
})
export class TechFormComponent {
  private fb = inject(NonNullableFormBuilder);
  protected techService = inject(TechService);
  protected readonly CATEGORIES = CATEGORIES;
  protected readonly RINGS = RINGS;

  editData = input<TechnologyDTO | null>(null);

  techForm = this.fb.group({
    name: ['', [Validators.required]],
    category: ['' as any, [Validators.required]],
    ring: ['' as any, []],
    description: ['', [Validators.required]],
    justification: ['', [Validators.required]],
    published: [false]
  });

  constructor() {
    effect(() => {
      const data = this.editData();
      const mode = this.techService.formMode();
      const controls = this.techForm.controls;
      if (data) {
        this.techForm.patchValue(data);
      } else {
        this.techForm.reset({ category: '', ring: '', published: false });
      }
      Object.values(controls).forEach(c => c.enable());
      switch (mode) {
        case TechFormMode.CREATE:
          controls.justification.clearValidators();
          controls.ring.clearValidators();
          break;

        case TechFormMode.PUBLISH:
        case TechFormMode.UPDATE_RING:
          controls.name.disable();
          controls.category.disable();
          controls.description.disable();
          controls.justification.setValidators([Validators.required]);
          controls.ring.setValidators([Validators.required]);
          break;

        case TechFormMode.EDIT_INFO:
          controls.ring.disable();
          controls.justification.disable();
          controls.ring.clearValidators();
          break;
      }

      Object.values(controls).forEach(c => c.updateValueAndValidity());
    });
  }

  onSubmit() {
    if (this.techForm.invalid) return;

    const raw = this.techForm.getRawValue();
    const payload = {
      ...raw,
      ring: raw.ring || undefined,
      justification: raw.justification || undefined,
    };
    const editId = this.editData()?.id;

    if (editId) {
      if (this.techService.formMode() === TechFormMode.PUBLISH) {
        payload.published = true;
      }
      this.techService.updateTechnology(editId, payload);
    } else {
      this.techService.createTechnology(payload);
    }
    this.closeModal();
  }

  protected get isCreateMode(): boolean {
    return this.techService.formMode() === TechFormMode.CREATE;
  }

  closeModal() {
    (document.getElementById('radar_modal') as HTMLDialogElement | null)?.close();
    const data = this.editData();
    if (data) {
      this.techForm.reset({ ...data, category: data.category ?? '', ring: data.ring ?? '' });
    } else {
      this.techForm.reset({ category: '', ring: '', published: false });
    }
  }
}
