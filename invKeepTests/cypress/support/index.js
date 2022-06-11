import './commands/commands';
import Utils from './pageObjectModel/Utils/Utils';

Cypress.env("assetItem", new Map())

before(`Change viewport`, () => {
    cy.viewport(1200,800);
})

after(`Total teardown`, () => {
    Utils.teardownAssets(`TestAsset`);
})