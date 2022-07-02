import './commands/commands';
import Utils from './pageObjectModel/Utils/Utils';

Cypress.env("assetItem", new Map())

after(`Total teardown`, () => {
    Utils.teardownAssets(`TestAsset`);
})