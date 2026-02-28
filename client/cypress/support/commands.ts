/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  cy.visit('/')

  cy.origin(
    Cypress.expose('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input#username').type(username)
      cy.get('input#password').type(password, { log: false })
      cy.contains('button[value=default]', 'Continue').click()
    }
  )

  cy.url().should('equal', 'http://localhost:4200/')
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.env(['ADMIN_USERNAME', 'ADMIN_PASSWORD']).then(
    ({ ADMIN_USERNAME, ADMIN_PASSWORD }) => {
      cy.loginToAuth0(ADMIN_USERNAME, ADMIN_PASSWORD)
    }
  )
})

Cypress.Commands.add('loginAsUser', () => {
  cy.env(['USER_USERNAME', 'USER_PASSWORD']).then(
    ({ USER_USERNAME, USER_PASSWORD }) => {
      cy.loginToAuth0(USER_USERNAME, USER_PASSWORD)
    }
  )
})

Cypress.Commands.add('acceptAuth0Consent', () => {
  cy.origin(Cypress.expose('auth0_domain'), () => {
    cy.get('button[value="accept"]').click();
  });
});

export {};


