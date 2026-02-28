const auth0Domain = Cypress.expose('auth0_domain');

describe('Auth', function () {

  it('Einloggen als Admin und Adminseite besuchen', function () {
    cy.loginAsAdmin();
    cy.get('[data-cy="nav-avatar-dropdown"]').click();
    cy.get('[data-cy="nav-dropdown-menu"]').should('be.visible');
    cy.get('[data-cy="nav-admin-link"]').should('be.visible');
  })

  it('Einloggen als User und Admiseite ist nicht auffindbar', function () {
    cy.loginAsUser();
    cy.get('[data-cy="nav-avatar-dropdown"]').click();
    cy.get('[data-cy="nav-dropdown-menu"]').should('be.visible');
    cy.get('[data-cy="nav-admin-link"]').should('not.exist');

  })

  it('Einloggen mit falschen Credentials zeigt Fehlermeldung', function () {
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
})
