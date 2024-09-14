const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7se2kj',
  e2e: {
    baseUrl: 'https://todomvc.com/examples/react-redux/dist/#/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
