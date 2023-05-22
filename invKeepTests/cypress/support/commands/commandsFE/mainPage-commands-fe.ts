Cypress.Commands.add(`getDataCyElement`, (cyAttributeValue: string, customTimeout: number = 4000) => {

    return cy.get(`[data-cy="${cyAttributeValue}"]`, { timeout: customTimeout });
})

Cypress.Commands.add(`findNextDataCyElement`, { prevSubject: `element` }, (subject, nextDataCyValue, customTimeout: number = 4000) => {
    return cy.wrap(subject).find(`[data-cy="${nextDataCyValue}"]`, { timeout: customTimeout });
})

Cypress.Commands.add(`assertImageSize`, { prevSubject: true }, (subject, fixtureImagePath) => {
    cy.wrap(subject).should(([img]) => {
        expect(img.complete).to.be.true;
    }).then(([img]) => {
        cy.fixture(fixtureImagePath).then(content => {

            let imageContent = new Image();
            imageContent.src = `data:image/*;base64,${content}`;
            return new Promise<void>(resolve => {
                imageContent.onload = () => {
                    expect(img.naturalHeight).to.equal(imageContent.naturalHeight);
                    expect(img.naturalWidth).to.equal(imageContent.naturalWidth);
                    resolve();
                }
            })
        })
    })
}) 