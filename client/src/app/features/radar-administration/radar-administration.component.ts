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
  technologies = this.techService.allTechnologies;
  selectedTech = this.techService.selectedTech;

  async ngOnInit() {
    await this.techService.fetchTechnologies();
  }

  openCreateModal() {
    this.techService.openCreate(); // Setzt selectedTech auf null
    this.showModal();
  }

  openPublishModal(tech: TechnologyDTO) {
    this.techService.openPublish(tech);
    this.showModal();
  }

  openEditModal(tech: TechnologyDTO) {
    this.techService.openEdit(tech);
    this.showModal();
  }

  openUpdateRingModal(tech: TechnologyDTO) {
    this.techService.openUpdateRing(tech);
    this.showModal();
  }

  private showModal () {
    (document.getElementById('radar_modal') as HTMLDialogElement).showModal();
  }
}
