const HomePage = require('../pageobjects/homePage.js');

describe('Check editing todos to the list is working correctly', () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the Todos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add a todo to the list and edit it', () => {
    //add a todo
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.element.should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');

    //edit a todo
    homePage.changeNameOfATodoByName(homePage.data.args.todoName, homePage.data.args.editedTodoName);
    homePage.getTodoByText(homePage.data.args.editedTodoName).should('be.visible');
  });
});
