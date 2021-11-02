describe(`Asset creation`, () => {

    beforeEach(`Visit main page`, () => {

        cy.visit(Cypress.config().baseUrl);
    });

    it(`Create asset`, () => {

        
        cy.getDataCyElement(`app-name`)
            .should(`contain`, `invKeep`);
    })
})