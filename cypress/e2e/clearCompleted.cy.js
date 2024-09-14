const HomePage = require('../pageobjects/homePage.js');

describe('Check clearing completed todos to the list is working correctly', () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the Todos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add two todo to the list and mark it as completed and delete all completed see that it is deleting only the completed', async () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.addTodo(homePage.data.args.secondTodoName);
    let todosText = [];

    const firstTodo = homePage.getTodoByIndex(0).should('be.visible');
    const secondTodo = homePage.getTodoByIndex(1).should('be.visible');

    homePage.checkTodoByIndex(0);

    homePage.clearCompleted();
    
    todosText = await homePage.getAlltodosText();
    expect(todosText.includes(homePage.data.args.todoName)).equal(false);
    expect(todosText.includes(homePage.data.args.secondTodoName)).equal(true);
  });
});
