describe('User Story 3 – Technologie publizieren', function () {

  beforeEach(function () {
    cy.loginAsAdmin();
    cy.navigateToAdmin();
  });

  it('Nicht publizierte Technologien sind als "Entwurf" gekennzeichnet', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("React")')
        .within(() => {
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Entwurf');
        });
    });
  });

  it('Bereits publizierte Technologien sind als "Veröffentlicht" gekennzeichnet', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Veröffentlicht');
        });
    });
  });

  it('Entwürfe haben einen "Publizieren"-Button, veröffentlichte nicht', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("React")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').should('exist');
        });

      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').should('not.exist');
        });
    });
  });

  it('Klick auf Publizieren öffnet das Formular mit deaktivierten Feldern (Name, Kategorie, Beschreibung)', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("React")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').should('be.disabled');
    cy.get('[data-cy="tech-form-category"]').should('be.disabled');
    cy.get('[data-cy="tech-form-description"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Beim Publizieren sind Ring und Begründung Pflichtfelder – Speichern ist ohne sie deaktiviert', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("React")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('TRIAL');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Technologie erfolgreich publizieren mit Ring und Begründung', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Cypress")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('TRIAL');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-justification"]').type('Starke DX für UI-Tests, insbesondere in SPAs. Bewährt sich in unseren Projekten.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Cypress")')
        .within(() => {
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Veröffentlicht');
          cy.get('[data-cy="admin-publish-btn"]').should('not.exist');
        });
    });
  });

  it('Nach Publizierung erscheint die Technologie auf dem Radar', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Go")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('ASSESS');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-justification"]').type('Gute Wahl für Cloud-native Services mit geringem Footprint.');

    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.navigateToRadar();
    cy.get('[data-cy="radar-blip-Go"]').should('be.visible');
  });

  it('Das Publizierungsdatum wird automatisch gesetzt (heutiges Datum)', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Kotlin")')
        .within(() => {
          cy.get('[data-cy="admin-publish-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-ring"]').select('ADOPT');
    cy.get('[data-cy="tech-form-justification"]').clear();
    cy.get('[data-cy="tech-form-justification"]').type('Bietet bessere Typsicherheit und Ergonomie als Java.');

    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');


    cy.navigateToRadar();
    cy.get('[data-cy="radar-blip-Kotlin"]').click();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const expectedDate = `${dd}.${mm}.${yyyy}`;

    cy.get('[data-cy="radar-modal"]').should('be.visible');
    cy.get('[data-cy="radar-modal"]').within(() => {
      cy.get('[data-cy="tech-detail-published-at"]').should('contain', expectedDate);
    });
  });
});
