const BasicElement = require('./basicElement.js');

class Input extends BasicElement {
  /**
   * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} selector
   */
  constructor(selector) {
    super(selector);
  }

  /**
   * @param {string} text 
   * @param {Partial<Cypress.TypeOptions>} options 
   */
  type(text, options = {}) {
    this.clear();
    this.getElement();
    this.element.type(text, options);
  }

  enter() {
    this.getElement();
    this.element.type('{enter}');
  }

  clear() {
    this.getElement();
    this.element.clear();
  }
}

module.exports = Input;
