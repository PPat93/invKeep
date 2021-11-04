import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreatePageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreatePage from "../../support/pageObjectModel/pageObjects/CreatePage";

describe(`Asset creation`, () => {
    let assetName = ``;

    beforeEach(`Visit main page`, () => {

        Utils.visitPage(Utils.mainPageUrl);
    });

    afterEach(`Teardown`, () => {

        Utils.visitPage(Utils.mainPageUrl);
        MainPage.deleteAsset(assetName);
    })

    it(`Create asset`, () => {

        assetName = `TestAsset ${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`);

        //  Act
        CreatePage.createAsset(assetName, `TASbl`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro);

        //  Assert
        cy.getDataCyElement(assetName.replace(` `, `-`).toLowerCase(), 4000)
            .should(`contain.text`, assetName);
    })
})