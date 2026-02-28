describe('User Story 5 – Technologie-Einordnung ändern', function () {

  beforeEach(function () {
    cy.loginAsAdmin();
    cy.navigateToAdmin();
  });

  // --- Read-only Tests (verändern nichts, nutzen Docker, schliessen mit Cancel) ---

  it('Veröffentlichte Technologien haben einen "Einordnung ändern"-Button', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').should('exist');
        });
    });
  });

  it('Klick auf "Einordnung ändern" öffnet das Formular mit Ring und Begründung editierbar', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-justification"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Beim Einordnung ändern sind Name, Kategorie und Beschreibung deaktiviert', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').should('be.disabled');
    cy.get('[data-cy="tech-form-category"]').should('be.disabled');
    cy.get('[data-cy="tech-form-description"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Speichern ist deaktiviert wenn Ring leer ist', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('HOLD');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
  });

  it('Speichern ist deaktiviert wenn Begründung fehlt', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('HOLD');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  // --- Tests die Daten verändern (jeder nutzt eine exklusive Technologie) ---

  // Exklusiv: AWS Lambda (publiziert, wird von keinem anderen Test gebraucht)
  it('Einordnung erfolgreich ändern und in der Tabelle sichtbar', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("AWS Lambda")')
        .within(() => {
          cy.get('[data-cy="admin-tech-ring"]').should('contain', 'Adopt');
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('HOLD');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-justification"]').type('AWS Lambda wird durch modernere Alternativen abgelöst.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("AWS Lambda")')
        .within(() => {
          cy.get('[data-cy="admin-tech-ring"]').should('contain', 'Hold');
        });
    });
  });

  // Exklusiv: GraphQL (publiziert, wird von keinem anderen Test gebraucht)
  it('Nach Einordnungsänderung ist die Technologie im richtigen Ring auf dem Radar', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("GraphQL")')
        .within(() => {
          cy.get('[data-cy="admin-update-ring-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('ADOPT');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-justification"]').type('GraphQL wird neu als Adopt eingestuft nach erfolgreicher Bewährung.');

    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.navigateToRadar();
    cy.get('[data-cy="radar-category-Techniken"]').within(() => {
      cy.get('[data-cy="radar-ring-Adopt"]').within(() => {
        cy.get('[data-cy="radar-blip-GraphQL"]').should('be.visible');
      });
    });
  });
});
