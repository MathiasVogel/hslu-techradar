import {Component, effect, inject, input} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TechnologyDTO} from '../../models/api.types';
import {CATEGORIES, RINGS} from '../constants/tech-radar.constatns';
import {TechLabelPipe} from '../pipes/tech-label-pipe';

@Component({
  selector: 'app-tech-form',
  standalone: true,
  imports: [ReactiveFormsModule, TechLabelPipe],
  templateUrl: './tech-form.component.html',
  styles: ``
})
export class TechFormComponent {
  private fb = inject(NonNullableFormBuilder);

  // Input für den Edit-Modus (optional)
  editData = input<TechnologyDTO | null>(null);

  // Das zentrale Formular-Objekt
  techForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['TECHNIQUES', [Validators.required]],
    ring: ['ASSESS', [Validators.required]],
    description: ['', [Validators.required]],
    published: [false]
  });

  constructor() {
    // Sobald sich editData ändert, füllen wir das Formular
    effect(() => {
      const data = this.editData();
      if (data) {
        this.techForm.patchValue(data);
      } else {
        this.techForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.techForm.valid) {
      const payload = this.techForm.getRawValue();
      if (this.editData()) {
        console.log('Update:', this.editData()?.id, payload);
        // this.techService.update(this.editData()!.id, payload);
      } else {
        console.log('Create:', payload);
        // this.techService.create(payload);
      }
    }
  }

  protected readonly RINGS = RINGS;
  protected readonly CATEGORIES = CATEGORIES;
}
