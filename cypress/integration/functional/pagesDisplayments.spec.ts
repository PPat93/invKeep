import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import DetailsPageConsts from "../../support/pageObjectModel/Utils/DetailsPageConsts";
import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";

describe(`Page displayments after direct access from URL`, () => {

    it(`Main page displayment`, () => {

        //  Arrange & Act
        Utils.visitPage(Utils.mainPageUrl);

        //  Assert
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`)
            .and(`contain.text`, MainPageConsts.assetListHeader);
        cy.getDataCyElement(MainPageConsts.appName).then(logo => {
            cy.wrap(logo)
                .should(`be.visible`);
            expect(logo.text()).to.eq(`invKeep`);
        })
    })

    it(`Create Page displayment`, () => {

        //  Arrange
        Utils.visitPage(Utils.mainPageUrl);

        //  Act
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();

        //  Assert    
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`)
            .and(`contain.text`, CreatePageConsts.createAssetFormHeader);
    })

    it(`Details Page displayment`, () => {
        let assetName = `DetailsPage${Date.now()}`;

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);
        CreateEditPage.createEditAsset(assetName, `DetPg`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);

        //  Act
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        //  Assert
        cy.url()
            .should(`contain`, Utils.detailsPageUrl);
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosCard)
            .should(`be.visible`)
            .and(`contain.text`, assetName);

        //  Teardown
        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
    })
    // TODO edit page
})