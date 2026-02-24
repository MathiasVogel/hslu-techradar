import { Component, inject, OnInit } from '@angular/core';
import { TechService } from '../../core/tech-service/tech.service';
import { TechnologyDTO } from '../../models/api.types';
import { TechLabelPipe } from '../../shared/pipes/tech-label-pipe';
import { TechFormComponent } from '../../shared/tech-form/tech-form.component';

@Component({
  selector: 'app-radar-administration',
  imports: [ TechLabelPipe, TechFormComponent ],
  templateUrl:'./radar-administration.component.html',
  styles: ``,
})
export class RadarAdministrationComponent implements OnInit {
  private techService = inject(TechService);

  technologies = this.techService.publishedTechnologies;
  selectedTechnologie: TechnologyDTO | null = null;

  openDialog(technologie: TechnologyDTO) {
    this.selectedTechnologie = technologie;
    (document.getElementById('radar_modal') as HTMLDialogElement).showModal();
  }

  async ngOnInit() {
    await this.techService.fetchTechnologies();
  }

  openCreateModal () {
    (document.getElementById('radar_modal') as HTMLDialogElement).showModal();
  }
}
