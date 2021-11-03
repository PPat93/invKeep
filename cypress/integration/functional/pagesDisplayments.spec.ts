import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import Utils from "../../support/pageObjectModel/Utils/Utils";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreatePageConsts";

describe(`Page displayments after direct access from URL`, () => {

    it(`Main page displayment`, () => {

        //  Arrange & Act
        MainPage.visitPage(MainPageConsts.mainPageUrl);

        //  Assert
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`)
            .and(`contain.text`, MainPageConsts.assetListHeader);
        cy.getDataCyElement(MainPageConsts.appName).then(logo => {
            cy.wrap(logo)
                .should(`be.visible`);
            expect(logo.text()).to.eq(`invKeep`);
        })
    })

    it(`Create Page displayment`, () => {

        //  Arrange
        MainPage.visitPage(MainPageConsts.mainPageUrl);

        //  Act
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();

        //  Assert    
        cy.url()
            .should(`contain`, CreatePageConsts.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm)
            .should(`be.visible`)
            .and(`contain.text`, CreatePageConsts.createAssetFormHeader);
    })

    // TODO details page and edit page
})