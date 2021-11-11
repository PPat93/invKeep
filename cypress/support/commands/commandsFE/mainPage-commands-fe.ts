Cypress.Commands.add(`getDataCyElement`, (cyAttributeValue: string, customTimeout: number = 4000) => {

    return cy.get(`[data-cy="${cyAttributeValue}"]`, { timeout: customTimeout });
})

Cypress.Commands.add(`findNextDataCyElement`, { prevSubject: `element` }, (subject, nextDataCyValue, customTimeout: number = 4000) => {
    return cy.wrap(subject).find(`[data-cy="${nextDataCyValue}"]`, { timeout: customTimeout });
})