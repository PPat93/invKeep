import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";

describe(`Analysis Ratios Ratio Details Modal displayment`, () => {

    let assetName: string = ``;

    beforeEach(`Create test asset`, () => {

        assetName = `TestAsset${Date.now()}`;


        cy.apiCreateAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    });

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    it(`Ratios Analysis - Ratio Details Modal displayment`, () => {

    })
})