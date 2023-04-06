import './commands';
import Utils from './pageObjectModel/Utils/Utils';

Cypress.env("assetItem", new Map())
Cypress.env("assetFile", new Map())

after(`Total teardown`, () => {
    Utils.teardownAssets(`TestAsset`);
})