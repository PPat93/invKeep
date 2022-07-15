import CreateEditPageConsts from "../../../support/pageObjectModel/Utils/CreateEditPageConsts";
import MainPageConsts from "../../../support/pageObjectModel/Utils/MainPageConsts";
import Utils from "../../../support/pageObjectModel/Utils/Utils"

describe(`Links and buttons clicking`, () => {

    it(`App logo click`, () => {

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

    it(`Create asset button click`, () => {

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);

        //  Act
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();

        //  Assert
        cy.getDataCyElement(Utils.loadingSpinner, 10000)
            .should(`not.exist`);
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`);
    })

    it(`Main page button click`, () => {

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);

        //  Act
        cy.getDataCyElement(Utils.mainPageBtn)
            .click();

        //  Assert
        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);
        cy.url()
            .should(`contain`, Utils.mainPageUrl);
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`);
    })
})