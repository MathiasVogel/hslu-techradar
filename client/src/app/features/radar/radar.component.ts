import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { TechnologyDTO } from '../../models/api.types';
import { TechDetailComponent } from '../../shared/tech-detail/tech-detail.component';

@Component({
  selector: 'app-radar',
  imports: [
    NgClass, TechDetailComponent
  ],
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent {
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

  technologies: TechnologyDTO[] = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'React',
      category: 'LANGUAGES_AND_FRAMEWORKS',
      ring: 'ADOPT',
      description: 'Die meistgenutzte Library für Web-Frontends.',
      justification: 'Industriestandard mit riesigem Ökosystem und hoher Stabilität.',
      published: true,
      createdAt: '2024-01-10T10:00:00.000Z',
      updatedAt: '2024-02-15T14:30:00.000Z',
      publishedAt: '2024-01-11T09:00:00.000Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'GitHub Copilot',
      category: 'TOOLS',
      ring: 'ADOPT',
      description: 'KI-gestützte Code-Vervollständigung.',
      justification: 'Signifikante Steigerung der Entwicklerproduktivität.',
      published: true,
      createdAt: '2024-03-01T08:00:00.000Z',
      updatedAt: '2024-03-05T12:00:00.000Z',
      publishedAt: '2024-03-02T10:00:00.000Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Vercel',
      category: 'PLATFORMS',
      ring: 'TRIAL',
      description: 'Optimale Plattform für Next.js und Frontend-Deployments.',
      justification: 'Setzt Maßstäbe in Sachen Developer Experience und Performance.',
      published: true,
      createdAt: '2023-12-15T11:00:00.000Z',
      updatedAt: '2024-01-05T09:00:00.000Z',
      publishedAt: '2023-12-20T15:00:00.000Z'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'GraphQL',
      category: 'TECHNIQUES',
      ring: 'TRIAL',
      description: 'Abfragesprache für APIs für präzisen Datentransfer.',
      justification: 'Reduziert Overfetching und verbessert die Effizienz im Frontend.',
      published: true,
      createdAt: '2023-11-20T16:00:00.000Z',
      updatedAt: '2024-02-01T10:00:00.000Z',
      publishedAt: '2023-11-25T12:00:00.000Z'
    }
  ];

  selectedTechnologie: TechnologyDTO | null = null;

  getBlipsForCell(catName: string, ringName: string): TechnologyDTO[] {
    return this.technologies.filter(b => b.category === catName && b.ring === ringName);
  }

  openDialog(technologie: TechnologyDTO) {
    this.selectedTechnologie = technologie;
    (document.getElementById('radar_modal') as HTMLDialogElement).showModal();
  }
}
