import {Component, inject, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { TechnologyDTO } from '../../core/api/api.types';
import { TechDetailComponent } from '../../shared/tech-detail/tech-detail.component';
import {TechService} from '../../core/tech-service/tech.service';
import {CATEGORIES, RINGS} from '../../shared/constants/tech-radar.constatns';
import { TechLabelPipe } from '../../shared/pipes/tech-label-pipe';

@Component({
  selector: 'app-radar',
  imports: [
    NgClass, TechDetailComponent, TechLabelPipe
  ],
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
  private techService = inject(TechService);

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

  protected readonly CATEGORIES = CATEGORIES;
  protected readonly RINGS = RINGS;
}
