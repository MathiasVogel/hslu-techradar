import {Component, effect, inject, input} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TechnologyDTO} from '../../models/api.types';
import {CATEGORIES, RINGS, TechFormMode} from '../constants/tech-radar.constatns';
import {TechLabelPipe} from '../pipes/tech-label-pipe';
import {TechService} from '../../core/tech-service/tech.service';

@Component({
  selector: 'app-tech-form',
  standalone: true,
  imports: [ReactiveFormsModule, TechLabelPipe],
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
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['TECHNIQUES' as any, [Validators.required]],
    ring: ['ASSESS' as any, [Validators.required]],
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
        this.techForm.reset({ category: 'TECHNIQUES', ring: 'ASSESS', published: false });
      }
      Object.values(controls).forEach(c => c.enable());
      switch (mode) {
        case TechFormMode.CREATE:
          controls.name.hasError('required');
          controls.justification.clearValidators();
          break;

        case TechFormMode.PUBLISH:
        case TechFormMode.UPDATE_RING:
          controls.name.disable();
          controls.category.disable();
          controls.description.disable();
          controls.justification.setValidators([Validators.required, Validators.minLength(10)]);
          break;

        case TechFormMode.EDIT_INFO:
          controls.ring.disable();
          controls.justification.disable();
          break;
      }

      Object.values(controls).forEach(c => c.updateValueAndValidity());
    });
  }

  onSubmit() {
    if (this.techForm.valid) {
      const payload = this.techForm.getRawValue();
      if (this.editData()) {
        if(!payload.published){
          payload.published = true;
        }
        this.techService.updateTechnology(this.editData()!.id, payload)
      } else {
        this.techService.createTechnology(payload)
      }
    }
    this.closeModal();
  }

  closeModal() {
    const modal = document.getElementById('radar_modal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }
}
