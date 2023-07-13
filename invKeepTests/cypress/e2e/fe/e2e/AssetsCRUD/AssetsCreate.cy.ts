import MainPage from "../../../../support/pageObjectModel/pageObjects/MainPage";
import CreateEditPageConsts from "../../../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils, { AssetCurrency } from "../../../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../../../support/pageObjectModel/pageObjects/CreateEditPage";

describe(`Assets creation`, () => {
    let assetName: string = ``;

    beforeEach(`Visit main page`, () => {

        Utils.visitPage(Utils.mainPageUrl);
    });

    afterEach(`Little teardown`, () => {

        Utils.teardownAssets(`TestAsset`);
    })

    it(`Create asset without purchase date`, () => {

        assetName = `TestAsset${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
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
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreateEditPage.createEditAsset(assetName, `TASbl`, 15, 1.45, AssetCurrency.euro, `03/25/2015`);

        //  Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000).then(createdAsset => {

            MainPage.assertAssetProperties(createdAsset, assetName, `TASbl`, `15`, `1.45 ${AssetCurrency.euro}`, `25.03.2015`);
        })
    })
})

// TODO - 6 - somewhat important - add negative scenarios