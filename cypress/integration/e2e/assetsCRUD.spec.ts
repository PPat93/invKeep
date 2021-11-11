import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";
import { moveSyntheticComments } from "typescript";

describe(`Assets CE`, () => {
    let assetName = ``;

    beforeEach(`Visit main page`, () => {

        Utils.visitPage(Utils.mainPageUrl);
    });

    afterEach(`Teardown`, () => {

        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
    })

    it(`Create asset without purchase date`, () => {

        assetName = `TestAsset ${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreateEditPage.createEditAsset(assetName, `TASbl`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro);

        //  Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .should(`contain.text`, assetName);
            
            // TODO add more assertions
    })

    it(`Create asset with purchase date`, () => {
        assetName = `TestAsset ${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreateEditPage.createEditAsset(assetName, `TASbl`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro, `03/25/2015`);

        //  Assert
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .should(`contain.text`, assetName);
            // TODO add more assertions
    })

    it(`Edit asset`, () => {

        assetName = `${Date.now().toString().slice(10, 12)} TestEdit`;

        //  Arrange
        cy.apiAssetCreation(assetName, `TST`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.dollar, `03/25/2015`);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .click();
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();

        //  Act
        assetName = `${assetName}Edited`
        CreateEditPage.createEditAsset(assetName, `EdTST`, 123, 12.5, AssetCurrency.pound, `5/4/2020`);

        //  Assert
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .should(`exist`);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .find(`mat-expansion-panel-header`)
            .then((assetHeader) => {

                expect(assetHeader).to.contain(assetName);
                cy.wrap(assetHeader)
                    .findNextDataCyElement(`asset-symbol`)
                    .should(`contain`, `EDTST`);
            });
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName)).then(editedAsset => {

            cy.wrap(editedAsset).findNextDataCyElement(`asset-amount`)
                .should(`contain.text`, `123`);
            cy.wrap(editedAsset).findNextDataCyElement(`asset-buy-price`)
                .should(`contain.text`, `12.5 £`);
            cy.wrap(editedAsset).findNextDataCyElement(`asset-purchase-price`)
                .should(`contain.text`, `4.05.2020`);
        })
        // TODO change input of date - currently inverted day and month, add prompt how date should be formatted


    })
})