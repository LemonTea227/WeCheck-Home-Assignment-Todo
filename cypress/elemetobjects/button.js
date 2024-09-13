const BasicElement = require('./basicElement.js');

class Button extends BasicElement {
    /**
     * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} selector
     */
    constructor(selector) {
        super(selector);
    }

    showAndClick() {
        this.getElement();
        this.element.should("be.hidden").invoke("show").click();
    }
}

module.exports = Button;