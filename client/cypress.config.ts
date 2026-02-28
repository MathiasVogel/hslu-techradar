import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    ADMIN_USERNAME: 'hoyt38@ethereal.email',
    ADMIN_PASSWORD: 'Admin123',
    USER_USERNAME: 'maia3@ethereal.email',
    USER_PASSWORD: 'User1234',
  },
  expose: {
    auth0_domain: 'mathias-vogel.eu.auth0.com',
    auth0_audience: 'https://mathias-vogel.eu.auth0.com/api/v2/',
    auth0_scope: 'openid profile email',
    auth0_client_id: 'HfrjiWW1RYDNx8hR3GUrspZBBIeCONLA',
  },

  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
