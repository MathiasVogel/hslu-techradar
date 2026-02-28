describe('User Story 2 – Technologie erfassen', function () {

  beforeEach(function () {
    cy.loginAsAdmin();
    cy.navigateToAdmin();
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn nur der Name ausgefüllt ist', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('ArgoCD');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn die Kategorie fehlt', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('ArgoCD');
    cy.get('[data-cy="tech-form-description"]').type('GitOps continuous delivery tool for Kubernetes.');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
  });

  it('Der Erstellen-Button bleibt deaktiviert, wenn die Beschreibung fehlt', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('ArgoCD');
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-submit"]').should('be.disabled');
  });

  it('Eine neue Technologie mit allen Pflichtfeldern erfolgreich erstellen', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('ArgoCD');
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-description"]').type('Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();

    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]').contains('[data-cy="admin-tech-name"]', 'ArgoCD').should('exist');
    });
  });

  it('Eine neue Technologie wird als Entwurf (nicht veröffentlicht) erfasst', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('TestTech');
    cy.get('[data-cy="tech-form-category"]').select('PLATFORMS');
    cy.get('[data-cy="tech-form-description"]').type('Eine Testbeschreibung für die Technologie.');

    cy.get('[data-cy="tech-form-submit"]').click();

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("TestTech")')
        .within(() => {
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Entwurf');
        });
    });
  });

  it('Eine Technologie mit allen Feldern inkl. Ring und Begründung erfassen', function () {
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('ArgoCD-Full');
    cy.get('[data-cy="tech-form-category"]').select('TOOLS');
    cy.get('[data-cy="tech-form-ring"]').select('TRIAL');
    cy.get('[data-cy="tech-form-description"]').type('Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.');
    cy.get('[data-cy="tech-form-justification"]').type('We recommend you give Argo CD a try based on our good experience.');

    cy.get('[data-cy="tech-form-submit"]').should('not.be.disabled');
    cy.get('[data-cy="tech-form-submit"]').click();

    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("ArgoCD-Full")')
        .within(() => {
          cy.get('[data-cy="admin-tech-name"]').should('contain', 'ArgoCD-Full');
          cy.get('[data-cy="admin-tech-category"]').should('contain', 'Werkzeuge');
          cy.get('[data-cy="admin-tech-status"]').should('contain', 'Entwurf');
        });
    });
  });

  it('Nach der Erfassung die Technologie wieder löschen', function () {
    // Erstellen
    cy.get('[data-cy="admin-create-btn"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('be.visible');

    cy.get('[data-cy="tech-form-name"]').type('CleanupTech');
    cy.get('[data-cy="tech-form-category"]').select('TECHNIQUES');
    cy.get('[data-cy="tech-form-description"]').type('Wird nach dem Test gelöscht.');

    cy.get('[data-cy="tech-form-submit"]').click();
    cy.get('[data-cy="tech-form-modal"]').should('not.be.visible');

    cy.get('[data-cy="admin-table"]').within(() => {
      cy.get('[data-cy="admin-tech-row"]')
        .filter(':contains("CleanupTech")')
        .within(() => {
          cy.get('[data-cy="admin-delete-btn"]').click();
        });
    });

    cy.get('[data-cy="admin-delete-modal"]').should('be.visible');
    cy.get('[data-cy="admin-delete-confirm"]').click();

    cy.get('[data-cy="admin-table"]').should('not.contain', 'CleanupTech');
  });
});

