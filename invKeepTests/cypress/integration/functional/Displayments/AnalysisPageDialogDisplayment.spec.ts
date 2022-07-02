import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import RatiosNamesFixture from "../../../fixtures/ratiosNames.json"
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";

describe(`Analysis Ratios - Ratios Details Dialog - sections visibility`, () => {

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
        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);

    });

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    RatiosNamesFixture.forEach(singleItem => {
        it(`Ratio Details Dialog - subsection titles displayment - ${singleItem}`, () => {

            // Arrange & Act
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

    RatiosNamesFixture.forEach(singleItem => {
        it(`Ratio Details Dialog - Short Description subsection displayment - ${singleItem}`, () => {

            // Arrange & Act
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(singleItem))
                .click({ force: true });

            // Assert    
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsDialog(singleItem))
                .findNextDataCyElement(AnalysisPageConsts.dialogShortDescriptionText).then(item => {
                    cy.wrap(item)
                        .should(`be.visible`);
                    expect(item.text()).length.be.greaterThan(30);
                })
        })
    })
})


describe(`Ratio Details Dialog - ratios texts displayments`, () => {

    let assetName: string = ``;

    beforeEach(`Create test asset`, () => {

        assetName = `TestAsset${Date.now()}`;

        cy.apiCreateAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);
    });

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    let item = [`CAPE Ratio`, `D/E Ratio`, `Dividend Yield Ratio`, `DPR Ratio`, `EPS Ratio`,
        `EV/EBITDA Ratio`, `EV/EBIT Ratio`, `Graham Number`, `P/B Ratio`, `PEG Ratio`,
    `P/E Ratio`]
    // TODO - exchange above item array with ratiosNames.json array file
    // TODO - change DPR Ratio to DP Ratio all caross the app
    item.forEach(singleRatio => {
        it.only(`${singleRatio} texts displayments`, () => {

            //  Arrange 
            let sanitizedRatioName = singleRatio.replace(/\s+/g, '').replace(/\//g, '');
            cy.fixture(`RatiosTexts/${sanitizedRatioName}`).then(ratioFixture => {

                //  Act
                cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(singleRatio))
                    .click({ force: true });

                // Asssert    
                cy.getDataCyElement(AnalysisPageConsts.dialogShortDescriptionText)
                    .should(`contain.text`, ratioFixture.shortDescription);
                cy.getDataCyElement(AnalysisPageConsts.dialogExtensiveDescriptionText)
                    .should(`contain.text`, ratioFixture.extensiveDescription);
                cy.getDataCyElement(AnalysisPageConsts.dialogUsageExampleText)
                    .should(`contain.text`, ratioFixture.example);

                ratioFixture.bulletPointSummary.forEach(singleItem => {

                    let singleItemIndex = ratioFixture.bulletPointSummary.indexOf(singleItem);
                    AnalysisPageConsts.getDialogBulletItem(singleItemIndex)
                        .should(`contain.text`, singleItem);
                })

                ratioFixture.coAnalysis.forEach(singleItem => {

                    let singleItemIndex = ratioFixture.coAnalysis.indexOf(singleItem);
                    AnalysisPageConsts.getDialogCoAnalysisItem(singleItemIndex)
                        .should(`contain.text`, singleItem);
                })

                ratioFixture.intervalsData.forEach(singleItem => {

                    let singleItemIndex = ratioFixture.intervalsData.indexOf(singleItem);
                    AnalysisPageConsts.getDialogIntervalItem(singleItemIndex)
                        .should(`contain.text`, singleItem.summary);
                })
            })
        })
    })
})
