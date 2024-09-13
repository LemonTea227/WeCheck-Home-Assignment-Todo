module.exports = {
  labels: {
    mainLabel: { selector: 'h1' },
    clearCompleted: { selector: '.clear-completed' },
    todoCount: { selector: '.todo-count' },
    todoLabel: { selector: '[data-testid="todo-item-label"]' },
  },
  inputs: {
    newTodo: { selector: '.new-todo' },
    editInput: { selector: '.edit' },
  },
  buttons: {
    allFilter: { selector: '[href="#/"]' },
    activeFilter: { selector: '[href="#/active]' },
    completedFiler: { selector: '[href="#/completed]' },
    deleteButton: { selector: '.destroy' },
    toggleCompletion: { selector: '[data-testid="toggle-all"]' },
  },
  toggles: {
    completedToggle: { selector: '[data-testid="todo-item-toggle"]' },
  },
  lists: {
    todosList: { 
        listSelector: '[data-testid="todo-list"]',
        childSelector: '[data-testid="todo-item"]' 
    },
  },
};
