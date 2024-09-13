const { before } = require("mocha");
const HomePage = require("../pageobjects/homePage.js");

/**@type {HomePage} */
let homePage;

describe('Verify adding todos to the list is possible', () => {
    
    before('open browser on the ToDos Site', () => {
        cy.visit('/');
        const homePage = new HomePage();
    })

    it('Add a todo to the list', () => {
        homePage.addTodo(homePage.data.args.todoName);
        homePage.inputs.newTodo.getInnerText().should.equal('');
        homePage.getTodoByText(homePage.data.args.todoName).should('be.visible');
    })



})