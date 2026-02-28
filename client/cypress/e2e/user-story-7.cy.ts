describe('User Story 7 – Anmelden am Technologie-Radar-Viewer', function () {

  it('Mittels korrektem Benutzername und korrektem Passwort gelange ich zum Technologie-Radar-Viewer', function () {
    cy.loginAsUser();
    cy.url().should('equal', 'http://localhost:4200/');
    cy.get('[data-cy="nav-radar"]').should('be.visible');
  });

  it('Nach der Anmeldung kann ich den Radar-Viewer aufrufen und Technologien einsehen', function () {
    cy.loginAsUser();
    cy.navigateToRadar();
    cy.get('[data-cy="radar-title"]').should('be.visible');
    cy.get('[data-cy="radar-blip-Docker"]').should('be.visible');
  });
});


