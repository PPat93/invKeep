import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";

describe(`Assets CRU`, () => {
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

    it(`Update asset`, () => {

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
    // TODO change input of date - currently inverted day and month, add prompt how date should be formatted
})

describe(`Assets D`, () => {

    it(`Delete existing asset `, () => {

        //   Arrange
        let assetName: string = `TestAsset${Date.now().toString().slice(10, 12)}`;

        cy.apiCreateAsset(assetName, `DelAs`, 12, 10.12, AssetCurrency.euro);
        cy.reload();

        //  Act & Assert
        MainPage.deleteAsset(assetName);
    })

    // TODO it(`Delete non-existing asset`, () => {})
    // TODO it(`Delete already deleted asset`, () => {})
})
