const auth0Domain = Cypress.expose('auth0_domain');

describe('Auth', function () {

  it('Einloggen als Admin und Adminseite besuchen', function () {
    cy.loginAsAdmin();
    cy.get('.dropdown.dropdown-end .btn-circle').click();
    cy.get('.dropdown-content').should('be.visible');
    cy.get('.dropdown-content').contains('a', 'Radar Admin').should('be.visible');
  })

  it('Einloggen als User und Admiseite ist nicht auffindbar', function () {
    cy.loginAsUser();
    cy.get('.dropdown.dropdown-end .btn-circle').click();
    cy.get('.dropdown-content').should('be.visible');
    cy.get('.dropdown-content').contains('a', 'Radar Admin').should('not.exist');

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
        cy.get('.dropdown.dropdown-end .btn-circle').click();
        cy.get('.dropdown-content').should('be.visible');
        cy.get('.dropdown-content').contains('a', 'Radar Admin').should('not.exist');
        cy.contains('[role=alert], .alert, .auth0-global-message', 'Wrong').should('be.visible');
      });
    }

  })

  it('Einloggen und dann Ausloggen funktioniert', function () {
    cy.loginAsUser();

    cy.get('.dropdown.dropdown-end .btn-circle').click();
    cy.get('.dropdown-content').should('be.visible');
    cy.get('.dropdown-content').contains('button', 'Log Out').click();

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
