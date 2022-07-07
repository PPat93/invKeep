import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";

describe(`Assets deletion`, () => {

    it(`Delete existing asset `, () => {

        //   Arrange
        let assetName: string = `TestAsset${Date.now().toString().slice(10, 12)}`;

        cy.apiCreateAsset(assetName, `DelAs`, 12, 10.12, AssetCurrency.euro);
        cy.reload();

        //  Act & Assert
        MainPage.deleteAsset(assetName);
    })

    // TODO add negative scenarios
    // TODO it(`Delete non-existing asset`, () => {})
    // TODO it(`Delete already deleted asset`, () => {})
})
