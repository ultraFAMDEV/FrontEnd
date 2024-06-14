const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    USER_MAIL_ADDRESS: "cedric@mail.fr",
    USER_PASSWORD: "cedric",
  },
});
