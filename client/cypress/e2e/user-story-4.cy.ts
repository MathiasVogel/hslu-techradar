describe('User Story 4 – Technologie ändern', function () {

  beforeEach(function () {
    cy.loginAsAdmin();
    cy.navigateToAdmin();
  });

  it('Veröffentlichte Technologien haben einen "Editieren"-Button', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').should('exist');
        });
    });
  });

  it('Nicht veröffentlichte Technologien haben keinen "Editieren"-Button', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("React")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').should('not.exist');
        });
    });
  });

  it('Klick auf Editieren öffnet das Formular – Name, Kategorie, Beschreibung editierbar; Ring und Begründung deaktiviert', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-category"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-description"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-ring"]').should('be.disabled');
    cy.get('[data-cy="tech-form-justification"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Das Formular ist mit den bestehenden Daten vorausgefüllt', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').should('have.value', 'Docker');
    cy.get('[data-cy="tech-form-category"]').should('have.value', 'TOOLS');
    cy.get('[data-cy="tech-form-description"]').should('contain.value', 'Containerisierung');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Speichern ist deaktiviert wenn Name leer ist', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').clear();
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Speichern ist deaktiviert wenn Beschreibung leer ist', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Docker")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-description"]').clear();
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Name einer Technologie erfolgreich ändern', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Vercel")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-name"]').clear();
    cy.get('[data-cy="tech-form-name"]').type('Vercel Platform');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Vercel Platform")')
        .within(() => {
          cy.get('[data-cy="admin-tech-name"]').should('contain', 'Vercel Platform');
        });
    });
  });

  it('Kategorie einer Technologie erfolgreich ändern', function () {
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Chaos Engineering")')
        .within(() => {
          cy.get('[data-cy="admin-edit-btn"]').click();
        });
    });

    cy.get('[data-cy="tech-form-modal"]').should('be.visible');
    cy.get('[data-cy="tech-form-category"]').select('PLATFORMS');

    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("Chaos Engineering")')
        .within(() => {
          cy.get('[data-cy="admin-tech-category"]').should('contain', 'Plattformen');
        });
    });
  });
});
