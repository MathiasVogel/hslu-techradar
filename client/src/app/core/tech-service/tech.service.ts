import {computed, Injectable, signal} from '@angular/core';
import { client } from '../api/client';
import {TechnologyDTO} from '../../models/api.types';

@Injectable({
  providedIn: 'root',
})
export class TechService {
  private technologiesSignal = signal<TechnologyDTO[]>([]);

  constructor() { }

  async fetchTechnologies(){
    const { data, error } = await client.GET("/api/technologies", {});

    if (error) {
      console.error(error);
      return;
    }
    this.technologiesSignal.set(data ?? []);
  }

  readonly allTechnologies = computed(() => this.technologiesSignal);

  readonly publishedTechnologies = computed(() =>
    this.technologiesSignal().filter(t => t.published)
  );

}
