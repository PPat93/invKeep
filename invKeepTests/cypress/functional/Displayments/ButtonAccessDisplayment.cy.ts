import Utils, { AssetCurrency } from "../../../cypress/support/pageObjectModel/Utils/Utils";
import CreateEditPageConsts from "../../../cypress/support/pageObjectModel/Utils/CreateEditPageConsts";
import AnalysisPageConsts from "../../../cypress/support/pageObjectModel/Utils/AnalysisPageConsts";
import MainPage from "../../../cypress/support/pageObjectModel/pageObjects/MainPage";

describe(`Page displayments after button click access`, () => {

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    it(`Analysis Page displayment`, () => {

        let assetName: string = `TestAsset${Date.now()}`;

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);
        cy.apiCreateAsset(assetName, `DetPg`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);

        //  Act
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        //  Assert
        cy.url()
            .should(`contain`, Utils.analysisPageUrl);
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisCard)
            .should(`be.visible`)
            .and(`contain.text`, assetName);
    })

    it(`Edit Page displayment`, () => {

        let assetName: string = `TestAsset${Date.now()}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `editPg`, 10, 11.2, AssetCurrency.pound);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();

        //  Act
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();
        cy.getDataCyElement(Utils.loadingSpinner, 5000)
            .should(`not.exist`);

        //  Assert
        cy.url()
            .should(`contain`, Utils.editPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`);
    })
})