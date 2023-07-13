import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import AnalysisPage from "../../../support/pageObjectModel/pageObjects/AnalysisPage";
import RatiosNamesFixture from "../../../fixtures/ratiosNames.json";

describe(`Analysis Ratios saving`, () => {

    let assetName: string = ``;
    let ratiosValues: number[] = [1, 3.4, 23.95];

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

    ratiosValues.forEach(singleRatioVal => {
        it(`Save ratios values - ${singleRatioVal}`, () => {

            //  Arrage & Act
            cy.get(AnalysisPageConsts.assetRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .type(`{backspace}${singleRatioVal}`);
            });
            cy.intercept(`PUT`, `${Utils.analysisRatiosUri}/*`).as(`updateRatios`)
            cy.getDataCyElement(AnalysisPageConsts.saveBtn)
                .click({ force: true })
            cy.wait(`@updateRatios`).then(() => {
                cy.reload();
            });

            //  Assert
            cy.get(AnalysisPageConsts.assetRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .should(`have.value`, `${singleRatioVal}`);
            });
        })
    })

    it(`Ratios Analysis - Analysis Table each ratio value is equal to corresponding Input Table value`, () => {

        let analysisParsed: number[] = [];
        let inputParsed: number[] = [];

        //  Arrange
        cy.get(AnalysisPageConsts.assetRatiosInputsClass).each((ratio, index) => {
            cy.wrap(ratio)
                .type(`{backspace}${index}`);
        });
        cy.intercept(`PUT`, `${Utils.analysisRatiosUri}/*`).as(`updateRatios`)
        cy.getDataCyElement(AnalysisPageConsts.saveBtn)
            .click({ force: true })
        cy.wait(`@updateRatios`).then(() => {
            cy.reload();
        });

        //  Act 
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisValueCell).then(analysisValueCells => {

            cy.wrap(analysisValueCells).each(singleAnalysis => {
                analysisParsed.push(parseFloat(singleAnalysis.text().trim()));
            })
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputValueCell).then(inputValueCells => {
            cy.wrap(inputValueCells).find(`input`).each(singleInput => {
                inputParsed.push(parseFloat(singleInput.val().toString()));
            })
        }).then(() => {

            //  Assert
            analysisParsed.forEach((item, index) => {
                expect(item).to.be.equal(inputParsed[index]);
            })
        })
    })

    it(`Ratios Analysis - Analysis Table ratio value is updated after Input Table is saved`, () => {

        let selectedRatio = `P/E Ratio`;
        let singleRatioValue = 12.54;

        //  Arrange
        AnalysisPage.setSingleRatioInput(selectedRatio, singleRatioValue);

        //  Act 
        cy.getDataCyElement(AnalysisPageConsts.saveBtn)
            .click({ force: true });

        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);

        //  Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisRow)
            .contains(selectedRatio)
            .parent()
            .findNextDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisValueCell)
            .should(`contain.text`, singleRatioValue);
    })

    it(`Ratios Analysis - Analysis Table Analysis cell values are updated after Input Table is saved`, () => {

        let summaryText = `Amazing earnings with really low price (compared to average of american stocks from last`;
        let verbalRating = `Outstanding`;
        let selectedRatio = `P/E Ratio`;
        let singleRatioValue = 0.54;

        //  Arrange
        AnalysisPage.setSingleRatioInput(selectedRatio, singleRatioValue);

        //  Act 
        cy.getDataCyElement(AnalysisPageConsts.saveBtn)
            .click({ force: true });

        cy.getDataCyElement(Utils.loadingSpinner)
            .should(`not.exist`);

        //  Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisRow)
            .contains(selectedRatio)
            .parent().then(analysisRow => {
                cy.wrap(analysisRow).findNextDataCyElement(AnalysisPageConsts.intervalsCellSummary)
                    .should(`contain.text`, summaryText);
                cy.wrap(analysisRow).findNextDataCyElement(AnalysisPageConsts.intervalsCellVerbalRating)
                    .should(`contain.text`, verbalRating);
            })
    })
})

describe(`Analysis Ratios Ratios Details Dialog opening and closing`, () => {

    let assetName: string = ``;

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
        it(`Ratios Analysis - Analysis Table Ratio Details dialog is opened after clicking on a Ratio Details button from Additional info cell - ${singleItem}`, () => {

            // Arrange
            cy.getDataCyElement(Utils.loadingSpinner)
                .should(`not.exist`);

            // Act
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(singleItem))
                .click({ force: true });

            // Assert    
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsDialog(singleItem))
                .should(`be.visible`);
            cy.get(AnalysisPageConsts.dialogHeaderClass)
                .should(`contain.text`, singleItem);
        })
    })

    RatiosNamesFixture.forEach(singleItem => {
        it(`Ratios Analysis - Analysis Table Ratio Details dialog is closed after clicking on a Close button - ${singleItem}`, () => {

            // Arrange
            cy.getDataCyElement(Utils.loadingSpinner)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsButton(singleItem))
                .click({ force: true });

            // Act
            cy.getDataCyElement(AnalysisPageConsts.dialogCloseButton)
                .scrollIntoView()
                .should(`be.visible`)
            cy.getDataCyElement(AnalysisPageConsts.dialogCloseButton)
                .click();

            // Assert
            cy.getDataCyElement(AnalysisPageConsts.ratioDetailsDialog(singleItem))
                .should(`not.exist`);
        })
    })
})