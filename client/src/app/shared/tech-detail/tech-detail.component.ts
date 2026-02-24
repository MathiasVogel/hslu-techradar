import { Component, Input } from '@angular/core';
import { TechnologyDTO } from '../../models/api.types';
import { CommonModule } from '@angular/common';
import { TechLabelPipe } from '../pipes/tech-label-pipe';

@Component({
  selector: 'app-tech-detail',
  standalone: true,
  imports: [CommonModule, TechLabelPipe],
  templateUrl: './tech-detail.component.html'
})
export class TechDetailComponent {
  @Input() technologie: TechnologyDTO | null = null;
}
