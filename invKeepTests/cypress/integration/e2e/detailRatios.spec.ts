import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";
import DetailsPageConsts from "../../support/pageObjectModel/Utils/DetailsPageConsts";

describe(`Analysis Ratios`, () => {

    let assetName = `TestAsset${Date.now()}`;
    let ratiosValues = [1, 3.4, 23.95]

    beforeEach(`Create test asset`, () => {

        cy.visit(Utils.createPageUrl);
        CreateEditPage.createEditAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
    });

    ratiosValues.forEach(singleRatioVal => {
        it(`Save detailed ratios - ${singleRatioVal} value`, () => {

            //  Arrage 
            cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
                .click();

            //  Act
            cy.get(DetailsPageConsts.detailedRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .type(`{backspace}${singleRatioVal}`);
            });
            cy.intercept(`PUT`, `${Utils.detailedRatiosUri}/*`).as(`updateRatios`)
            cy.getDataCyElement(DetailsPageConsts.detailedRatiosButton)
                .click({ force: true })
            cy.wait(`@updateRatios`).then(() => {
                cy.reload();
            });

            //  Assert
            cy.get(DetailsPageConsts.detailedRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .should(`have.value`, `${singleRatioVal}`);
            });
        })
    })
})