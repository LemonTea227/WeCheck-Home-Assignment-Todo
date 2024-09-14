const HomePage = require('../pageobjects/homePage.js');

describe('Check completing todos to the list is working correctly', () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the Todos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add a todo to the list and mark it as completed', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.text', '');
    homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');

    homePage.checkTodoByText(homePage.data.args.todoName);
    const checkedElement = homePage.getTodoCompletedToggleByText(
      homePage.data.args.todoName,
    );
    checkedElement.element.should('be.checked');

    homePage.uncheckTodoByText(homePage.data.args.todoName);
    const uncheckedElement = homePage.getTodoCompletedToggleByText(
      homePage.data.args.todoName,
    );
    uncheckedElement.element.should('not.be.checked');
  });

  it('Add some todos and see that all can be completed', () => {
    const todos = Array.from(
      { length: 5 },
      (_, i) => homePage.data.args.genericTodoName + (i + 1),
    );

    todos.forEach((todo) => homePage.addTodo(todo)); //add all todos
    todos.forEach((todo) => homePage.checkTodoByText(todo)); //mark as completed
    todos.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).element.should('be.checked'),
    ); //check they are all marked as checked

    todos.forEach((todo) => homePage.uncheckTodoByText(todo)); //mark as not completed
    todos.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .element.should('not.be.checked'),
    ); //check they are all marked as unchecked
  });

  it('Add some todos and see that all can be completed by the arrow button', () => {
    const todos = Array.from(
      { length: 5 },
      (_, i) => homePage.data.args.genericTodoName + (i + 1),
    );

    todos.forEach((todo) => homePage.addTodo(todo)); //add all todos

    //click the arrow button and check that all the tasks are toggled to completed
    homePage.toggleAllTodos();
    todos.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).element.should('be.checked'),
    );

    //click the arrow button and check that all the tasks are toggled to not completed
    homePage.toggleAllTodos();
    todos.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .element.should('not.be.checked'),
    );
  });

  it('Add some todos and see that all can be completed by the arrow button even when some are completed', () => {
    const todos = Array.from(
      { length: 5 },
      (_, i) => homePage.data.args.genericTodoName + (i + 1),
    );

    todos.forEach((todo) => homePage.addTodo(todo)); //add all todos

    homePage.checkTodoByIndex(0);
    homePage.checkTodoByIndex(1);

    homePage.getTodoCompletedToggleByIndex(0).element.should('be.checked');
    homePage.getTodoCompletedToggleByIndex(1).element.should('be.checked');

    //click the arrow button and check that all the tasks are toggled to completed
    homePage.toggleAllTodos();
    todos.forEach((todo) =>
      homePage.getTodoCompletedToggleByText(todo).element.should('be.checked'),
    );

    //click the arrow button and check that all the tasks are toggled to not completed
    homePage.toggleAllTodos();
    todos.forEach((todo) =>
      homePage
        .getTodoCompletedToggleByText(todo)
        .element.should('not.be.checked'),
    );
  });
});
