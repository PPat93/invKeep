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

    it(`CAPE Ratio texts displayments`, () => {

        cy.fixture(`RatiosTexts/CAPERatio`).then(CAPERatioFix => {
            
        cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(`CAPE Ratio`))
            .click({ force: true });
        cy.getDataCyElement(AnalysisPageConsts.dialogShortDescriptionText).then(shortDesc => {
            expect(shortDesc.text()).be.eq(CAPERatioFix.shortDescription)
            // TODO add all texts of cape ratio
            // automate iteration through the ratios instead defining each test itself
        })

    })


    })
})
