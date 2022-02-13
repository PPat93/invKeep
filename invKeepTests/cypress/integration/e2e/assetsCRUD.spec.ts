import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";

describe(`Assets CRU`, () => {
    let assetName = ``;

    beforeEach(`Visit main page`, () => {

        Utils.visitPage(Utils.mainPageUrl);
    });

    afterEach(`Teardown`, () => {

        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
        // TODO modify to delete all assets starting with "TestAsset[numbers]" at the end of each tests so there won't be any leftovers
    })

    it(`Create asset without purchase date`, () => {

        assetName = `TestAsset${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreateEditPage.createEditAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);

        //  Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000).then(createdAsset => {
            MainPage.assertAssetProperties(createdAsset, assetName, `TASbl`, `19`, `245.5 ${AssetCurrency.euro}`, `-`);
        })
    })

    it(`Create asset with purchase date`, () => {
        assetName = `TestAsset${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreateEditPage.createEditAsset(assetName, `TASbl`, 15, 1.45, AssetCurrency.euro, `03/25/2015`);

        //  Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000).then(createdAsset => {

            MainPage.assertAssetProperties(createdAsset, assetName, `TASbl`, `15`, `1.45 ${AssetCurrency.euro}`, `25.03.2015`);
        })
    })

    it(`Update asset`, () => {

        assetName = `TestAsset${Date.now().toString().slice(10, 12)}`;

        //  Arrange
        cy.apiAssetCreation(assetName, `TST`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.dollar, `03/25/2015`);
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
    // TODO change input of date - currently inverted day and month, add prompt how date should be formatted
})

describe(`Assets deletion`, () => {

    it(`Delete existing asset `, () => {

    })

    // TODO it(`Delete non-existing asset`, () => {})
})