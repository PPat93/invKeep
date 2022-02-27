import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../../support/pageObjectModel/pageObjects/CreateEditPage";
import DetailsPageConsts from "../../../support/pageObjectModel/Utils/DetailsPageConsts";

describe(`Assets edition`, () => {
    let assetName: string = ``;

    beforeEach(`Visit main page`, () => {

        Utils.visitPage(Utils.mainPageUrl);
    });

    afterEach(`Little teardown`, () => {

        Utils.teardownAssets(`TestAsset`);
    })

    it(`Update asset from main page`, () => {

        assetName = `TestAsset${Date.now().toString().slice(10, 12)}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `TST`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.dollar, `03/25/2015`);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .click();
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();

        //  Act
        assetName = `${assetName}Edit`
        CreateEditPage.createEditAsset(assetName, `EdTST`, 123, 12.5, AssetCurrency.pound, `5/4/2020`);

        //  Assert
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .should(`exist`);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .then((asset) => {

                MainPage.assertAssetProperties(asset, assetName, `EdTST`, `123`, `12.5 ${AssetCurrency.pound}`, `4.05.2020`);
            });
    })

    it.only(`Update asset rom detailed page`, () => {

        assetName = `TestAsset${Date.now().toString().slice(10, 12)}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `TST`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.dollar, `03/25/2015`);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);

        cy.getDataCyElement(DetailsPageConsts.editBtn)
            .click();
        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);
            
        //  Act
        assetName = `${assetName}Edit`
        CreateEditPage.createEditAsset(assetName, `EdTST`, 123, 12.5, AssetCurrency.pound, `5/4/2020`);

        //  Assert
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .should(`exist`);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .then((asset) => {

                MainPage.assertAssetProperties(asset, assetName, `EdTST`, `123`, `12.5 ${AssetCurrency.pound}`, `4.05.2020`);
            });
    })
    // TODO add negative scenarios
    // TODO change input of date - currently inverted day and month, add prompt how date should be formatted
})