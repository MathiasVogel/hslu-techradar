import { Component, Input } from '@angular/core';
import { TechnologyDTO } from '../../models/api.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-detail.component.html'
})
export class TechDetailComponent {
  @Input() technologie: TechnologyDTO | null = null;
  @Input() labelMap: Record<string, string> = {};
}
