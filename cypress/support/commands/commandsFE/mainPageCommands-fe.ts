Cypress.Commands.add(`getDataCyElement`, (cyAttributeValue) => {

    return cy.get(`[data-cy="${cyAttributeValue}"]`);
})