declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0(username: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsUser(): Chainable<void>;
      navigateToAdmin(): Chainable<void>;
      navigateToRadar(): Chainable<void>;
    }

    interface Cypress {
      env(): {

      };
    }
  }
}

export {};
