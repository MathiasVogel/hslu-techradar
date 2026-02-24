import {computed, Injectable, signal} from '@angular/core';
import { client } from '../api/client';
import {TechnologyDTO} from '../../models/api.types';
import {TechFormMode} from '../../shared/constants/tech-radar.constatns';

@Injectable({
  providedIn: 'root',
})
export class TechService {
  constructor() { }

  private technologiesSignal = signal<TechnologyDTO[]>([]);
  selectedTech = signal<TechnologyDTO | null>(null);

  readonly allTechnologies = computed(() => this.technologiesSignal());

  readonly publishedTechnologies = computed(() =>
    this.technologiesSignal().filter(t => t.published)
  );

  formMode = signal<TechFormMode>(TechFormMode.CREATE);

  async fetchTechnologies(){
    const { data, error } = await client.GET("/api/technologies", {});

    if (error) {
      console.error(error);
      return;
    }
    this.technologiesSignal.set(data ?? []);
  }

  openPublish(tech: TechnologyDTO) {
    this.selectedTech.set(tech);
    this.formMode.set(TechFormMode.PUBLISH);
  }

  openCreate() {
    this.selectedTech.set(null);
    this.formMode.set(TechFormMode.CREATE);
  }

  openEdit(tech: TechnologyDTO) {
    this.selectedTech.set(tech);
    this.formMode.set(TechFormMode.EDIT_INFO);
  }

  openUpdateRing(tech: TechnologyDTO) {
    this.selectedTech.set(tech);
    this.formMode.set(TechFormMode.UPDATE_RING);
  }

}
