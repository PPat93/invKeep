Cypress.Commands.add(`getDataCyElement`, (cyAttributeValue, customTimeout: number = 4000) => {

    return cy.get(`[data-cy="${cyAttributeValue}"]`, {timeout: customTimeout});
})