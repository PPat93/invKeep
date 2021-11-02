describe(`Main Page smoke tests`, () => {

    beforeEach(`Visit main page`, () => {

        cy.visit(Cypress.config().baseUrl);
    });

    it(`Display main page`, () => {

        cy.getDataCyElement(`app-name`)
            .should(`contain`, `invKeep`);
    })
})