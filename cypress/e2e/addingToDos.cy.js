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
    homePage.inputs.newTodo.getElement().should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');
  });

  it('Add some todos and see that all are inserted correctly', () => {
    for (let i = 0; i < 20; i++) {
      homePage.addTodo(homePage.data.args.genericTodoName + i.toString());
    }

    homePage.inputs.newTodo.getElement().should('have.text', '');

    for (let i = 0; i < 20; i++) {
      homePage
        .getTodoByText(homePage.data.args.genericTodoName + i.toString())
        .should('be.visible');
    }
  });
});
