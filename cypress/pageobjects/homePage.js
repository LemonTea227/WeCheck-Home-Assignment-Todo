const selectors = require('../selectors/homePage.css.js');
const data = require('../fixtures/home_page.json');
const Label = require('../elemetobjects/label.js');
const Button = require('../elemetobjects/button.js');
const Input = require('../elemetobjects/input.js');
const Toggle = require('../elemetobjects/toggle.js');
const List = require('../elemetobjects/list.js');

class HomePage {
  constructor() {
    this.data = { ...data };

    /**@type {Object<string, Label>}*/
    this.labels = { ...selectors.labels };
    /**@type {Object<string, Button>}*/
    this.buttons = { ...selectors.buttons };
    /**@type {Object<string, Input>}*/
    this.inputs = { ...selectors.inputs };
    /**@type {Object<string, Toggle>}*/
    this.toggles = { ...selectors.toggles };
    /**@type {Object<string, List>}*/
    this.lists = { ...selectors.lists };

    for (const key in selectors.labels) {
      this.labels[key] = new Label(selectors.labels[key].selector);
    }

    for (const key in selectors.buttons) {
      this.buttons[key] = new Button(selectors.buttons[key].selector);
    }

    for (const key in selectors.inputs) {
      this.inputs[key] = new Input(selectors.inputs[key].selector);
    }

    for (const key in selectors.toggles) {
      this.toggles[key] = new Toggle(selectors.toggles[key].selector);
    }

    for (const key in selectors.lists) {
      this.lists[key] = new List(
        selectors.lists[key].listSelector,
        selectors.lists[key].childSelector,
      );
    }
  }

  elements = {
    labels: this.labels,
    buttons: this.buttons,
    inputs: this.inputs,
    toggles: this.toggles,
    lists: this.lists,
  };

  addTodo(text) {
    this.inputs.newTodo.type(text, { release: false });
    this.inputs.newTodo.enter();
  }

  /**
   * returns all the todos text
   * @returns {Promise<string[]>}
   */
  async getAlltodosText() {
    return await this.lists.todosList.getAllChildrenText();
  }

  getTodoByText(text) {
    return this.lists.todosList.getChildByText(text);
  }

  getTodoByIndex(index = 0) {
    return this.lists.todosList.getChildByIndex(index);
  }

  deleteTodoByText(text) {
    const todo = this.getTodoByText(text);
    const deleteButton = new Button(
      todo.get(selectors.buttons.deleteButton.selector).first(),
    );
    deleteButton.showAndClick();
  }

  deleteTodoByIndex(index = 0) {
    const todo = this.getTodoByIndex(index);
    const deleteButton = new Button(
      todo.find(selectors.buttons.deleteButton.selector),
    );
    deleteButton.showAndClick();
  }

  checkTodoByText(text) {
    const completionToggle = this.getTodoCompletedToggleByText(text);
    completionToggle.check();
  }

  checkTodoByIndex(index = 0) {
    const completionToggle = this.getTodoCompletedToggleByIndex(index);
    completionToggle.check();
  }

  uncheckTodoByText(text) {
    const completionToggle = this.getTodoCompletedToggleByText(text);
    completionToggle.uncheck();
  }

  uncheckTodoByIndex(index = 0) {
    const completionToggle = this.getTodoCompletedToggleByIndex(index);
    completionToggle.uncheck();
  }

  getTodoCompletedToggleByText(text) {
    const todo = this.lists.todosList.getChildByText(text);
    return new Toggle(todo.get(selectors.toggles.completedToggle.selector));
  }

  getTodoCompletedToggleByIndex(index = 0) {
    const todo = this.lists.todosList.getChildByIndex(index);
    return new Toggle(todo.find(selectors.toggles.completedToggle.selector));
  }

  changeNameOfATodoByName(currentName, newName) {
    const todo = this.getTodoByText(currentName).dblclick();
    const editInput = new Input(todo.get(selectors.inputs.editInput.selector));
    editInput.type(newName, { release: false });
    editInput.enter();
  }

  changeNameOfATodoByIndex(index = 0, newName) {
    const todo = this.getTodoByIndex(index).dblclick();
    const editInput = new Input(todo.find(selectors.inputs.editInput.selector));
    editInput.type(newName, { release: false });
    editInput.enter();
  }

  toggleAllTodos() {
    this.buttons.toggleCompletion.click();
  }

  /**
   * gets the number of the todos from the label
   * @returns {number}
   */
  getNumberOfTodos() {
    return this.labels.todoCount.getInnerText().slice(0, 1);
  }

  /**
   * clicks on the filter that is chosen
   * @param {'all'| 'active' | 'completed'} filterName
   */
  chooseFilter(filterName) {
    const filterUrl = this.data.inputs.urls[filterName];

    this.buttons[filterName + 'Filter'].click({ waitForAnimations: false });

    cy.location('hash').should('eq', filterUrl);

    // Reset or update the application state
    cy.window().then((win) => {
      if (!win.store) {
        win.store = initializeStore(); // Replace with your store initialization logic
      }
      win.store.dispatch({ type: 'RESET_STATE' });
    });
  }

  clearCompleted() {
    this.labels.clearCompleted.click();
  }
}

module.exports = HomePage;
