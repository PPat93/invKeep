import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";
import DetailsPageConsts from "../../support/pageObjectModel/Utils/DetailsPageConsts";

describe(`Analysis Ratios`, () => {

    let assetName = `TestAsset${Date.now()}`;

    beforeEach(`Create test asset`, () => {

        cy.visit(Utils.createPageUrl);
        CreateEditPage.createEditAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
    });

    afterEach(`Teardown`, () => {

        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
    })

    it(`Save detailed ratios`, () => {

        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        cy.get(`.single-detailed-ratio`).each(ratio => {
            cy.wrap(ratio)
                .type(`{backspace}1`);
        })

        cy.getDataCyElement(DetailsPageConsts.detailedRatiosButton)
            .click({ force: true });

        cy.reload();

        cy.get(`.single-detailed-ratio`).each(ratio => {
            cy.wrap(ratio)
                .should(`have.value`, `1`);
        })
    })
})