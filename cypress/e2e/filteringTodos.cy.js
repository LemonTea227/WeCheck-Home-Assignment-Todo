const HomePage = require('../pageobjects/homePage.js');

describe('Check completing todos to the list is working correctly', async () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the Todos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add two todos to the list and mark it as completed then check the filters are working correctly', async () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.addTodo(homePage.data.args.secondTodoName);
    let todosText = [];

    const firstTodo = homePage.getTodoByIndex(0).should('be.visible');
    const secondTodo = homePage.getTodoByIndex(1).should('be.visible');

    homePage.checkTodoByIndex(0);

    homePage.chooseFilter('completed');

    todosText = await homePage.getAlltodosText();
    expect(todosText.includes(homePage.data.args.todoName)).equal(true);
    expect(todosText.includes(homePage.data.args.secondTodoName)).equal(false);

    homePage.chooseFilter('active');
    
    todosText = await homePage.getAlltodosText();
    expect(todosText.includes(homePage.data.args.todoName)).equal(false);
    expect(todosText.includes(homePage.data.args.secondTodoName)).equal(true);
  });
});
