import MainPage from "../../../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../../../support/pageObjectModel/Utils/Utils";

describe(`Assets read`, () => {

    let assetName: string;

    beforeEach(`Visit main page`, () => {

        assetName = `TestAsset${Date.now()}`;
    })

    afterEach(`Little teardown`, () => {

        Utils.teardownAssets(`TestAsset`);
    })

    it(`Read asset without purchase date`, () => {

        //  Arrange
        cy.apiCreateAsset(assetName, `readDat`, 112, 54.78, AssetCurrency.euro).then(res => {
            if (res.status === 201)
                Cypress.env(`assetItem`).set(assetName, res.body.assetId);
        });

        Utils.visitPage(Utils.mainPageUrl);

        //  Act & Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName)).then(readAsset => {
            MainPage.assertAssetProperties(readAsset, assetName, `readDat`, `112`, `54.78 ${AssetCurrency.euro}`, `-`);
        })
    })

    it(`Read asset with purchase date`, () => {

        cy.apiCreateAsset(assetName, `readDat`, 112, 54.78, AssetCurrency.euro, `27/09/2020`).then(res => {
            if (res.status === 201)
                Cypress.env(`assetItem`).set(assetName, res.body.assetId);
        });

        Utils.visitPage(Utils.mainPageUrl);

        //  Arrange, Act & Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName)).then(readAsset => {
            MainPage.assertAssetProperties(readAsset, assetName, `readDat`, `112`, `54.78 ${AssetCurrency.euro}`, `27/09/2020`);
        })
    })
    // TODO- 6 - somewhat important- add negative scenarios
})
