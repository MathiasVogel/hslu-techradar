declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0(email: string, password: string): Chainable<void>;
    }

    interface Cypress {
      env(): {

      };
    }
  }
}

export {};
