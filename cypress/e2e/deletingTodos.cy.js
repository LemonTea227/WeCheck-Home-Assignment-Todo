const HomePage = require('../pageobjects/homePage.js');

describe('Check deleting todos to the list is working correctly', () => {
  /**@type {HomePage} */
  let homePage;

  beforeEach('open browser on the Todos Site', () => {
    cy.visit('/');
    homePage = new HomePage();
  });

  it('Add one todo to the list and delete it', () => {
    homePage.addTodo(homePage.data.args.todoName);
    homePage.inputs.newTodo.getElement().should('have.text', '');
    const todo = homePage
      .getTodoByText(homePage.data.args.todoName)
      .should('be.visible');

    homePage.deleteTodoByText(homePage.data.args.todoName);
    todo.should('not.exist');
  });

  it('Add some todos and see that all can be deleted', () => {
    const todos = Array.from(
      { length: 5 },
      (_, i) => homePage.data.args.genericTodoName + (i + 1),
    );

    let todosElements = [];

    todos.forEach((todo) => homePage.addTodo(todo)); //add all todos

    todos.forEach((todo) => todosElements.push(homePage.getTodoByText(todo)));

    todos.forEach((todo) => homePage.deleteTodoByText(todo));

    // // also works
    // for (let i = todos.length - 1; i >= 0; i--) {
    //     homePage.deleteTodoByIndex(i);        
    // }

    for (let i = 0; i < todosElements.length; i++) {
        todosElements[i].should('not.exist');        
    }
    
  });
});
