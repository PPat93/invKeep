import MainPageConsts from "../Utils/MainPageConsts";

/**
 * 
 * Main page class containing all methods used on invKeep main page
 * @class
 * 
 */
class MainPage {

    dataCyElementAsset(assetName: string) {
        return `${assetName.replace(/ /g, `-`).toLowerCase()}`;
    }

    dataCyElementEditBtn(assetName: string) {
        return `${assetName.replace(/ /g, `-`).toLowerCase()}-edit`;
    }

    dataCyElementDeleteBtn(assetName: string) {
        return `${assetName.replace(/ /g, `-`).toLowerCase()}-delete`;
    }

    dataCyElementDetailsBtn(assetName: string) {
        return `${assetName.replace(/ /g, `-`).toLowerCase()}-details`;
    }

    deleteAsset(assetToDeleteion: string) {

        //  Arrange
        let dataCyParam = this.dataCyElementAsset(assetToDeleteion);

        cy.getDataCyElement(dataCyParam)
            .click();
        cy.getDataCyElement(this.dataCyElementDeleteBtn(assetToDeleteion))
            .should(`exist`);

        //  Act
        cy.getDataCyElement(this.dataCyElementDeleteBtn(assetToDeleteion))
            .click();

        //  Assert    
        cy.getDataCyElement(dataCyParam, 2000)
            .should(`not.exist`);
    }

    assertAssetProperties(asset: object, assetName: string, assetSymbol: string, assetAmount: string, assetBuyPrice: string, assetPurchaseDate: string) {

        cy.wrap(asset)
            .click();
        cy.wrap(asset)
            .find(`mat-panel-title`)
            .should(`contain.text`, assetName);
        cy.wrap(asset)
            .findNextDataCyElement(MainPageConsts.assetSymbol)
            .should(`contain`, assetSymbol.toUpperCase());
        cy.wrap(asset)
            .findNextDataCyElement(MainPageConsts.assetAmount)
            .should(`contain.text`, assetAmount);
        cy.wrap(asset)
            .findNextDataCyElement(MainPageConsts.assetBuyPrice)
            .should(`contain.text`, assetBuyPrice);
        cy.wrap(asset)
            .findNextDataCyElement(MainPageConsts.assetPurchaseDate)
            .should(`contain.text`, assetPurchaseDate);
    }
}

export default new MainPage();
