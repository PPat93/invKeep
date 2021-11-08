import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPage from "../../support/pageObjectModel/pageObjects/CreateEditPage";

describe(`Asset creation`, () => {
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
    })

    it(`Edit asset`, () => {

        assetName = `TestAsset ${Date.toString().slice(9, 12)}`;

        //  Arrange
        cy.apiAssetCreation(assetName, `TST`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.dollar);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName), 4000)
            .click();
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();

        //  Act
        assetName = `${assetName}Edited`
        CreateEditPage.createEditAsset(assetName, `EdTST`, 123, 12.5, AssetCurrency.pound, `05/04/2020`);

        //  Assert
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .should(`exist`);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .should((editedAsset) => {

                expect(editedAsset).to.contain(assetName);
                expect(editedAsset).to.contain(`12.5 £`);
                expect(editedAsset).to.contain(`EDTST`);
            });
        // TODO -  fix tests to not step further until spinner disappeared
    })
})