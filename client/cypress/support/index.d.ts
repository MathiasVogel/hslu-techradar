declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0(username: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsUser(): Chainable<void>;
      acceptAuth0Consent(): Chainable<void>;
    }

    interface Cypress {
      env(): {

      };
    }
  }
}

export {};
