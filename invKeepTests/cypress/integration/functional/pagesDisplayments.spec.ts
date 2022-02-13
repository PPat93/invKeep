import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
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
        cy.getDataCyElement(Utils.appName).then(logo => {
            cy.wrap(logo)
                .should(`be.visible`);
            expect(logo.text()).to.eq(`invKeep`);
        })
    })

    it(`Create Page displayment`, () => {

        //  Arrange & Act
        Utils.visitPage(Utils.createPageUrl);

        //  Assert    
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`)
            .and(`contain.text`, CreateEditPageConsts.createAssetFormHeader);
    })

})

describe(`Page displayments after button click access`, () => {

    it(`Details Page displayment`, () => {

        let assetName = `TestAsset${Date.now()}`;

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

    it(`Edit Page displayment`, () => {

        let assetName = `TestAsset${Date.now()}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `editPg`, 10, 11.2, AssetCurrency.pound);
        cy.reload();
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

        //  Teardown
        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
    })
})

describe(`Visibility of Detailed Page elements`, () => {

    let assetName = `TestAsset${Date.now()}`;

    beforeEach(`Create asset`, () => {
        cy.apiCreateAsset(assetName, `itemVis`, 10, 1.21, AssetCurrency.dollar);
        cy.visit(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    })

    it(`Detailed ratios inputs visibility`, () => {

        cy.getDataCyElement(DetailsPageConsts.detailedRatiosNameCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailRatiosInputTable).then(inputTable => {
            cy.wrap(inputTable)
                .findNextDataCyElement(DetailsPageConsts.detailedRatiosNameCell).each(singleCell => {
                    expect(singleCell.text().length).to.be.greaterThan(1);
                })
        })
    })
})