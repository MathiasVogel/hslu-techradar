describe('User Story 6 – Technologien anzeigen', function () {

  beforeEach(function () {
    cy.loginAsUser();
    cy.navigateToRadar();
  });

  it('Alle 4 Kategorien werden auf dem Radar angezeigt', function () {
    cy.get('[data-cy="radar-category-Werkzeuge"]').should('exist');
    cy.get('[data-cy="radar-category-Plattformen"]').should('exist');
    cy.get('[data-cy="radar-category-Techniken"]').should('exist');
    cy.get('[data-cy="radar-category-Sprachen & Frameworks"]').should('exist');
  });

  it('Alle 4 Ringe werden pro Kategorie angezeigt', function () {
    cy.get('[data-cy="radar-category-Werkzeuge"]').within(() => {
      cy.get('[data-cy="radar-ring-Adopt"]').should('exist');
      cy.get('[data-cy="radar-ring-Trial"]').should('exist');
      cy.get('[data-cy="radar-ring-Assess"]').should('exist');
      cy.get('[data-cy="radar-ring-Hold"]').should('exist');
    });
  });

  it('Kategorie Werkzeuge zeigt die publizierten Technologien korrekt an', function () {
    cy.get('[data-cy="radar-category-Werkzeuge"]').within(() => {
      cy.get('[data-cy="radar-blip-Docker"]').should('be.visible');
      cy.get('[data-cy="radar-blip-Grafana"]').should('be.visible');
      cy.get('[data-cy="radar-blip-GitHub Copilot"]').should('be.visible');
      cy.get('[data-cy="radar-blip-Terraform"]').should('be.visible');
    });
  });

  it('Kategorie Plattformen zeigt die publizierten Technologien korrekt an', function () {
    cy.get('[data-cy="radar-category-Plattformen"]').within(() => {
      cy.get('[data-cy="radar-blip-Kubernetes"]').should('be.visible');
      cy.get('[data-cy="radar-blip-AWS Lambda"]').should('be.visible');
    });
  });

  it('Kategorie Techniken zeigt die publizierten Technologien korrekt an', function () {
    cy.get('[data-cy="radar-category-Techniken"]').within(() => {
      cy.get('[data-cy="radar-blip-TDD"]').should('be.visible');
      cy.get('[data-cy="radar-blip-Domain-Driven Design"]').should('be.visible');
      cy.get('[data-cy="radar-blip-GraphQL"]').should('be.visible');
    });
  });

  it('Kategorie Sprachen & Frameworks zeigt die publizierten Technologien korrekt an', function () {
    cy.get('[data-cy="radar-category-Sprachen & Frameworks"]').within(() => {
      cy.get('[data-cy="radar-blip-Rust"]').should('be.visible');
      cy.get('[data-cy="radar-blip-TypeScript"]').should('be.visible');
    });
  });

  it('Technologie Terraform wird im Ring Trial der Kategorie Werkzeuge angezeigt', function () {
    cy.get('[data-cy="radar-category-Werkzeuge"]').within(() => {
      cy.get('[data-cy="radar-ring-Trial"]').within(() => {
        cy.get('[data-cy="radar-blip-Terraform"]').should('be.visible');
      });
    });
  });

  it('Technologie TDD wird im Ring Adopt der Kategorie Techniken angezeigt', function () {
    cy.get('[data-cy="radar-category-Techniken"]').within(() => {
      cy.get('[data-cy="radar-ring-Adopt"]').within(() => {
        cy.get('[data-cy="radar-blip-TDD"]').should('be.visible');
      });
    });
  });

  it('Technologie Kubernetes wird im Ring Adopt der Kategorie Plattformen angezeigt', function () {
    cy.get('[data-cy="radar-category-Plattformen"]').within(() => {
      cy.get('[data-cy="radar-ring-Adopt"]').within(() => {
        cy.get('[data-cy="radar-blip-Kubernetes"]').should('be.visible');
      });
    });
  });

  it('Technologie Rust wird im Ring Trial der Kategorie Sprachen & Frameworks angezeigt', function () {
    cy.get('[data-cy="radar-category-Sprachen & Frameworks"]').within(() => {
      cy.get('[data-cy="radar-ring-Trial"]').within(() => {
        cy.get('[data-cy="radar-blip-Rust"]').should('be.visible');
      });
    });
  });

  it('Nicht publizierte Technologien werden nicht auf dem Radar angezeigt', function () {
    cy.get('[data-cy="radar-blip-WebAssembly"]').should('not.exist');
    cy.get('[data-cy="radar-blip-React"]').should('not.exist');
    cy.get('[data-cy="radar-blip-Jenkins"]').should('not.exist');
  });

  it('Bei der Technologie Grafana den Dialog öffnen und die Detailinformationen prüfen', function () {
    cy.get('[data-cy="radar-blip-Grafana"]').click();

    cy.get('[data-cy="radar-modal"]').should('be.visible');
    cy.get('[data-cy="radar-modal"]').within(() => {
      cy.get('[data-cy="tech-detail-name"]').should('contain', 'Grafana');
      cy.get('[data-cy="tech-detail-category"]').should('contain', 'Werkzeuge');
      cy.get('[data-cy="tech-detail-ring"]').should('contain', 'Adopt');
      cy.get('[data-cy="tech-detail-description"]').should('contain', 'Visualisierung und Alerting');
      cy.get('[data-cy="tech-detail-justification"]').should('contain', 'Zentraler Baustein');
      cy.get('[data-cy="tech-detail-published-at"]').should('contain', '12.01.2024');
      cy.get('[data-cy="tech-detail-close"]').click();
    });
  });
});
