import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import RatiosNamesFixture from "../../../fixtures/ratiosNames.json"
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";

describe(`Analysis Ratios Ratios Details Dialog items visibility`, () => {

    let assetName: string = ``;
    let dialogSubsectionTitles = [`Short description`, `Extensive description`, `Bullet point summary`, `Co-Analysis`, `Intervals`, `Formula`, `Usage example`];

    beforeEach(`Create test asset`, () => {

        assetName = `TestAsset${Date.now()}`;

        cy.apiCreateAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    });

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    RatiosNamesFixture.forEach(singleItem => {
        it(`Ratios Analysis - Analysis Table Ratio Details dialog subsection titles displayment - ${singleItem}`, () => {

            // Arrange
            cy.getDataCyElement(Utils.loadingSpinner)
                .should(`not.exist`);

            // Act
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(singleItem))
                .click({ force: true });

            // Assert    

            dialogSubsectionTitles.forEach(singleSubsectionTitle => {
                cy.getDataCyElement(AnalysisPageConsts.ratioDetailsDialog(singleItem))
                    .find(`mat-card-title`)
                    .contains(singleSubsectionTitle)
                    .scrollIntoView()
                    .should(`be.visible`);
            })
        })
    })
})