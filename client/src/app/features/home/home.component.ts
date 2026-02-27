import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  template: `
    <div class="min-h-[80vh] flex flex-col items-center py-12 px-4">

      <div class="hero bg-base-200 rounded-3xl p-8 max-w-5xl shadow-xl">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold text-primary">Tech Radar</h1>
            <p class="py-6 text-lg">
              Dieses System dient der zentralen Erfassung, Bewertung und Visualisierung von Technologien.
              Es unterstützt Entscheidungsträger dabei, den technologischen Reifegrad innerhalb der Organisation
              objektiv zu bewerten.
            </p>
            <button routerLink="/radar" class="btn btn-primary btn-lg">Zum Radar</button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl w-full">

        <div class="card bg-base-100 shadow-md border border-base-300">
          <div class="card-body items-center text-center">
            <div class="bg-primary/10 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 class="card-title text-secondary">Visualisieren</h2>
            <p class="text-sm">Betrachten Sie Technologien in den vier Quadranten und deren Reifegrad von "Assess" bis "Adopt".</p>
          </div>
        </div>

        <div class="card bg-base-100 shadow-md border border-base-300">
          <div class="card-body items-center text-center">
            <div class="bg-secondary/10 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 class="card-title text-secondary">Verwalten</h2>
            <p class="text-sm">Als Administrator können Sie neue Technologien hinzufügen, Informationen bearbeiten oder Ringe aktualisieren.</p>
          </div>
        </div>

        <div class="card bg-base-100 shadow-md border border-base-300">
          <div class="card-body items-center text-center">
            <div class="bg-accent/10 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="card-title text-secondary">Transparenz</h2>
            <p class="text-sm">Jede Änderung am Radar erfordert eine Begründung, um strategische Entscheidungen nachvollziehbar zu machen.</p>
          </div>
        </div>

      </div>

      <div class="mt-16 text-center text-base-content/60">
        <p>Entwickelt für das Modul WEBLAB</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {

}
