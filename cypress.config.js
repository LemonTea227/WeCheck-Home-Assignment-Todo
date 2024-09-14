const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wbygqg',
  e2e: {
    baseUrl: 'https://todomvc.com/examples/react-redux/dist/#/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
