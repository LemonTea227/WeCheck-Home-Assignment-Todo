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
    this.children = this.element.children();
    return this.children;
  }

  getChildByIndex(index = 0) {
    this.getElement();
    return ((this.element.find(this.childSelector)).eq(index));
  }

  getChildByText(text) {
    this.getElement();
    return ((this.element.find(this.childSelector)).contains(new RegExp(text, "g")));
  }

  /**
   * returns all the list children text
   * @returns {Promise<string[]>}
   */
  getAllChildrenText() {
    this.getElement();
    return this.element.get(this.childSelector).then(($els) => {
      const texts = Cypress._.map($els, 'innerText');
      return texts;
    });
  }
}

module.exports = List;
