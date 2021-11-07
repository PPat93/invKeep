/**
 * 
 * Main page class containing all methods used on invKeep main page
 * @class
 * 
 */
class MainPage {

    dataCyElementAsset(assetName: string){
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
}

export default new MainPage();
