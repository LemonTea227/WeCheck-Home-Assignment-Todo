const BasicElement = require('./basicElement.js');

class List extends BasicElement {
  /**
   * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} listSelector
   * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} childSelector
   */
  constructor(listSelector, childSelector) {
    super(listSelector);
    this.childSelector = childSelector;
  }

  getAllElements() {
    this.getElement();
    return this.element.children();
  }

  getChildByIndex(index = 0) {
    this.getElement();
    return this.element.get(this.childSelector).eq(index);
  }

  getChildByText(text) {
    this.getElement();
    return this.element.contains(text).parent();
  }
}

module.exports = List;
