const BasicElement = require('./basicElement.js');

class Label extends BasicElement {
    /**
     * @param {string |  Cypress.Chainable<JQuery<HTMLElement>>} selector
     */
    constructor(selector) {
        super(selector);
    }
}

module.exports = Label;