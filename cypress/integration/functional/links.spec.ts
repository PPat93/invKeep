import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils"

describe(`Links clicking`, () => {

    it(`App logo url redirection`, () => {

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);

        //  Act
        cy.getDataCyElement(Utils.appName)
            .click();

        //  Assert
        cy.getDataCyElement(Utils.loadingSpinner, 10000)
            .should(`not.exist`);
        cy.url()
            .should(`contain`, Utils.mainPageUrl);
        cy.getDataCyElement(Utils.appName)
            .should(`be.visible`);
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`);
    })
})