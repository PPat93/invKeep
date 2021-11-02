import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";

describe(`Page displayments after direct access from URL`, () => {

    it(`Main page displayment`, () => {

        //  Arrange & Act
        MainPage.visitPage(MainPageConsts.mainPageUrl);

        //  Assert
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`)
            .and(`contain.text`, MainPageConsts.assetListHeader);
    })
})