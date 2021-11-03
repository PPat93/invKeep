import Utils from "../Utils/Utils";
/**
 * 
 * Main page class containing all methods used on invKeep main page
 * @class
 * 
 */
class MainPage {

    visitPage(pageUrl: string) {
        Utils.visitPage(pageUrl);
    }

    deleteAsset(assetToDeleteion: string) {

        //  Arrange
        let dataCyParam = `${assetToDeleteion.replace(` `, `-`).toLowerCase()}`;

        cy.getDataCyElement(dataCyParam)
            .click();
        cy.getDataCyElement(`${dataCyParam}-delete`)
            .should(`exist`);

        //  Act
        cy.getDataCyElement(`${dataCyParam}-delete`)
            .click();

        //  Assert    
        cy.getDataCyElement(dataCyParam, 2000)
            .should(`not.exist`);
    }
}

export default new MainPage();
