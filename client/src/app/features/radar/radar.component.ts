import {Component, inject, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { TechnologyDTO } from '../../models/api.types';
import { TechDetailComponent } from '../../shared/tech-detail/tech-detail.component';
import {TechService} from '../../core/tech-service/tech.service';

@Component({
  selector: 'app-radar',
  imports: [
    NgClass, TechDetailComponent
  ],
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
  private techService = inject(TechService);

  readonly categories = ['TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGES_AND_FRAMEWORKS'] as const;
  readonly rings = ['ADOPT', 'TRIAL', 'ASSESS', 'HOLD'] as const;
  readonly labelMap: Record<string, string> = {
    'TECHNIQUES': 'Techniques',
    'PLATFORMS': 'Platforms',
    'TOOLS': 'Tools',
    'LANGUAGES_AND_FRAMEWORKS': 'Languages & Frameworks',
    'ADOPT': 'Adopt',
    'TRIAL': 'Trial',
    'ASSESS': 'Assess',
    'HOLD': 'Hold'
  };

  technologies = this.techService.publishedTechnologies;
  selectedTechnologie: TechnologyDTO | null = null;

  getTechsForCell(catName: string, ringName: string): TechnologyDTO[] {
    return this.technologies().filter(t => t.category === catName && t.ring === ringName);
  }

  openDialog(technologie: TechnologyDTO) {
    this.selectedTechnologie = technologie;
    (document.getElementById('radar_modal') as HTMLDialogElement).showModal();
  }

  async ngOnInit() {
      await this.techService.fetchTechnologies();
  }
}
