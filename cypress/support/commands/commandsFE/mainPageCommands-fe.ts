Cypress.Commands.add(`getDataCyElement`, (cyAttributeValue: string, customTimeout: number = 4000) => {

    return cy.get(`[data-cy="${cyAttributeValue}"]`, { timeout: customTimeout });
})