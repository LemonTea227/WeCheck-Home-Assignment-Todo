const HomePage = require('../pageobjects/homePage.js');

describe('Verify adding todos to the list is possible', () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the ToDos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add a todo to the list', () => {
    homePage.addTodo(homePage.data.args.todoName);
    (homePage.inputs.newTodo.getElement()).should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');
  });
});
