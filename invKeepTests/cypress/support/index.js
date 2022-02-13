// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/commands';


after(`Teardown`, () => {
    cy.apiGetAsset().then(res => {
        res.body.payload.forEach(singleItem => {
            if (singleItem.assetName.match(`TestAsset`)) {
                cy.apiDeleteAsset(singleItem.id);
            }
        })
    })
})

// Alternatively you can use CommonJS syntax:
// require('./commands')