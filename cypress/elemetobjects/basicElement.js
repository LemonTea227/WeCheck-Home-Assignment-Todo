class BasicElement {
  /**
   * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} selector
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.selector = selector;
      this.element;
    } else {
      this.element = selector;
    }
  }


  getElement() {
    if (!this.element) {
      this.element = cy.get(this.selector);
    }
    return this.element;
  }

  /**
   * gets the inner text of the element
   * @returns {string}
   */
  getInnerText() {
    this.getElement();
    return this.element.invoke('text').then((text) => {
      text.trim()
    });
  }

  /**
   * clicks on the element
   * @param {Partial<Cypress.ClickOptions>} options
   */
  click(options = {}) {
    this.getElement();
    this.element.click(options);
  }

  /**
   * right clicks on the element
   * @param {Partial<Cypress.ClickOptions>} options
   */
  rightClick(options = {}) {
    this.getElement();
    this.element.rightclick(options);
  }
}

module.exports = BasicElement;
