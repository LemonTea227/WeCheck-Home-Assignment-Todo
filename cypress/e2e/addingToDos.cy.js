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
    const todos = Array.from(
      { length: 20 },
      (_, i) => homePage.data.args.genericTodoName + (i+1),
    );

    todos.forEach((todo) => homePage.addTodo(todo));

    homePage.inputs.newTodo.getElement().should('have.text', '');

    todos.forEach((todo) => homePage.getTodoByText(todo).should('be.visible'));
  });
});
