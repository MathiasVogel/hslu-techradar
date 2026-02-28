describe('User Story 2 – Technologie erfassen', function () {

  beforeEach(function () {
    cy.loginAsAdmin();
    cy.navigateToAdmin();
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn nur der Name ausgefüllt ist', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('US2-Validation1');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn die Kategorie fehlt', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('US2-Validation2');
    cy.get('[data-cy="tech-form-description"]').type('GitOps continuous delivery tool for Kubernetes.');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn die Beschreibung fehlt', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('US2-Validation3');
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
    cy.get('[data-cy="tech-form-cancel"]').click();
  });

  it('Das Formular kann über den Abbrechen-Button geschlossen werden ohne Speicherung', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('US2-Cancel-SollNichtExistieren');
    cy.get('[data-cy="tech-form-category"]').select('TECHNIQUES');
    cy.get('[data-cy="tech-form-description"]').type('Beschreibung die nicht gespeichert wird.');

    cy.get('[data-cy="tech-form-cancel"]').click();

    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');
    cy.get('[data-cy="admin-table"]').should('not.contain', 'US2-Cancel-SollNichtExistieren');
  });

  it('Eine neue Technologie mit allen Pflichtfeldern erfolgreich erstellen und wieder löschen', function () {
    const techName = 'US2-Create-' + Date.now();

    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type(techName);
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-description"]').type('Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]').contains('[data-cy="admin-tech-name"]', techName).should('exist');
    });

    // Cleanup
    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(`:contains("${techName}")`)
        .within(() => {
          cy.get('[data-cy="admin-delete-btn"]').click();
        });
    });
    cy.get('[data-cy="admin-delete-modal"]').should('be.visible');
    cy.get('[data-cy="admin-delete-confirm"]').click();
  });

  it('Eine neue Technologie wird als Entwurf (nicht veröffentlicht) erfasst und wieder gelöscht', function () {
    const techName = 'US2-Draft-' + Date.now();

    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type(techName);
    cy.get('[data-cy="tech-form-category"]').select('PLATFORMS');
    cy.get('[data-cy="tech-form-description"]').type('Eine Testbeschreibung für die Technologie.');

    cy.get('[data-cy="tech-form-submit"]').click();

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(`:contains("${techName}")`)
        .within(() => {
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Entwurf');
        });
    });

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(`:contains("${techName}")`)
        .within(() => {
          cy.get('[data-cy="admin-delete-btn"]').click();
        });
    });
    cy.get('[data-cy="admin-delete-modal"]').should('be.visible');
    cy.get('[data-cy="admin-delete-confirm"]').click();
  });

  it('Eine Technologie mit allen Feldern inkl. Ring und Begründung erfassen und wieder löschen', function () {
    const techName = 'US2-Full-' + Date.now();

    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type(techName);
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-ring"]').select('TRIAL');
    cy.get('[data-cy="tech-form-description"]').type('Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.');
    cy.get('[data-cy="tech-form-justification"]').type('We recommend you give Argo CD a try based on our good experience.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(`:contains("${techName}")`)
        .within(() => {
          cy.get('[data-cy="admin-tech-name"]').should('contain', techName);
          cy.get('[data-cy="admin-tech-category"]').should('contain', 'Werkzeuge');
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Entwurf');
        });
    });

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(`:contains("${techName}")`)
        .within(() => {
          cy.get('[data-cy="admin-delete-btn"]').click();
        });
    });
    cy.get('[data-cy="admin-delete-modal"]').should('be.visible');
    cy.get('[data-cy="admin-delete-confirm"]').click();
  });
});
