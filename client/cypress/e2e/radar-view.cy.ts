describe('Radar-View', function () {
  let test = it('Auf dem Radar wurd die Veröffentlichte Technologie Docker angezeigt', function () {
    cy.loginAsUser();
    cy.navigateToRadar()
    cy.get('[data-cy="radar-title"]').should('be.visible');

    cy.get('[data-cy="radar-category-Werkzeuge"]')
      .within(() => {
        cy.get('[data-cy="radar-blip-Docker"]').should('be.visible');
      });
  });

  it('Auf dem Radar wird die nicht Veröffentlichte Technologie Go nicht angezeigt', function () {
    cy.loginAsUser();
    cy.visit('/radar');

    cy.get('[data-cy="radar-blip-Go"]').should('not.exist');
  })

  it('Bei der Technologie Grafana den Dialog öffnen und die anzeigen kontrolliern', function () {
    cy.loginAsUser();
    cy.navigateToRadar()

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
  })

  it('Auf dem Radar prüfen ob die Technologie Terraform in der Richtigen Kategorie und Ring angezeigt wird', function () {
    cy.loginAsUser();
    cy.navigateToRadar()

    cy.get('[data-cy="radar-category-Werkzeuge"]')
      .within(() => {
        cy.get('[data-cy="radar-ring-Trial"]').within(() => {
          cy.get('[data-cy="radar-blip-Terraform"]').should('be.visible');
        });
      });
  })

  it('Auf dem Radar prüfen ob die Technologie TDD in der Richtigen Kategorie und Ring angezeigt wird', function () {
    cy.loginAsUser();
    cy.navigateToRadar()

    cy.get('[data-cy="radar-category-Techniken"]')
      .within(() => {
        cy.get('[data-cy="radar-ring-Adopt"]').within(() => {
          cy.get('[data-cy="radar-blip-TDD"]').should('be.visible');
        });
      });
  })
});
