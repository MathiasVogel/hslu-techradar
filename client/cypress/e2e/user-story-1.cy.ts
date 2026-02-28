describe('Anmelden Technologie-Radar-Administration', function () {

  it('Mittels korrektem Benutzername und korrektem Passwort und der Rolle Admin gelange ich zur Administration.', function () {
    cy.loginAsAdmin();
    cy.get('[data-cy="nav-avatar-dropdown"]').click();
    cy.get('[data-cy="nav-dropdown-menu"]').should('be.visible');
    cy.get('[data-cy="nav-admin-link"]').should('be.visible');
  })

  it('Mittels der Rolle User kann ich nicht zur Administration', function () {
    cy.loginAsUser();
    cy.get('[data-cy="nav-avatar-dropdown"]').click();
    cy.get('[data-cy="nav-dropdown-menu"]').should('be.visible');
    cy.get('[data-cy="nav-admin-link"]').should('not.exist');
  })

  it('Mit nicht korrekten Benutzerdaten (Benutzername / Passwort) kann ich mich nicht anmelden.', function () {
    cy.on('fail', (err) => {
      if (err.message.includes('http://localhost:4200/')) {
        return false;
      }
      throw err;
    });

    cy.loginToAuth0('invalid_user', 'invalid_pass')

    if (auth0Domain) {
      cy.origin(auth0Domain, () => {
        cy.contains('[role=alert], .alert, .auth0-global-message', 'Wrong').should('be.visible');
      });
    }

  })

  it('Einloggen und dann Ausloggen funktioniert', function () {
    cy.loginAsUser();

    cy.get('[data-cy="nav-avatar-dropdown"]').click();
    cy.get('[data-cy="nav-dropdown-menu"]').should('be.visible');
    cy.get('[data-cy="nav-logout"]').click();

    if (auth0Domain) {
      cy.origin(auth0Domain, () => {
        cy.url().should('include', '/u/login');
        cy.get('input#username').should('be.visible');
      });
    } else {
      cy.url().should('include', 'auth0');
    }
  })
});
