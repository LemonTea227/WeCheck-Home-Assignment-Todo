const BasicElement = require('./basicElement.js');

class Input extends BasicElement {
  /**
   * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} selector
   */
  constructor(selector) {
    super(selector);
  }

  isChecked() {
    this.getElement();
    return this.element.is(":indeterminate");
  }

  check() {
    this.getElement();
    this.element.check();
  }

  uncheck() {
    this.getElement();
    this.element.uncheck();
  }
}

module.exports = Input;
