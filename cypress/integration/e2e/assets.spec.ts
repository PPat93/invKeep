import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import CreatePageConsts from "../../support/pageObjectModel/Utils/CreatePageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils";

describe(`Asset creation`, () => {

    beforeEach(`Visit main page`, () => {

        MainPage.visitPage(MainPageConsts.mainPageUrl);
    });

    it(`Create asset`, () => {

        let assetName = `Test Asset ${Date.now()}`;

        //  Arrange
        cy.getDataCyElement(Utils.createAssetBtn)
            .click();
        cy.url()
            .should(`contain`, CreatePageConsts.createPageUrl);
        cy.getDataCyElement(CreatePageConsts.createAssetForm);

        //  Act
        cy.getDataCyElement(CreatePageConsts.fullName)
            .type(`${assetName}`);
        cy.getDataCyElement(CreatePageConsts.symbol)
            .type(`TASbl`);
        cy.getDataCyElement(CreatePageConsts.amount)
            .type(`${Date.now().toString().slice(10, 12)}`);
        cy.getDataCyElement(CreatePageConsts.price)
            .type(`1.45`);
        cy.getDataCyElement(CreatePageConsts.currency)
            .click()
        cy.get(`mat-option`)
            .contains(`€`)
            .click({ force: true });
        cy.getDataCyElement(CreatePageConsts.submitBtn)
            .click();

        //  Assert
        cy.getDataCyElement(MainPageConsts.assetList)
            .find(`mat-expansion-panel-header`)
            .should(`contain.text`, assetName);

    })
})