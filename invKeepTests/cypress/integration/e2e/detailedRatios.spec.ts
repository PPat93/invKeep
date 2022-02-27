import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import DetailsPageConsts from "../../support/pageObjectModel/Utils/DetailsPageConsts";

describe(`Analysis Ratios saving`, () => {

    let assetName: string = ``;
    let ratiosValues: number[] = [1, 3.4, 23.95]

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
        it(`Save detailed ratios - ${singleRatioVal} value`, () => {

            //  Arrage & Act
            cy.get(DetailsPageConsts.detailedRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .type(`{backspace}${singleRatioVal}`);
            });
            cy.intercept(`PUT`, `${Utils.detailedRatiosUri}/*`).as(`updateRatios`)
            cy.getDataCyElement(DetailsPageConsts.saveBtn)
                .click({ force: true })
            cy.wait(`@updateRatios`).then(() => {
                cy.reload();
            });

            //  Assert
            cy.get(DetailsPageConsts.detailedRatiosInputsClass).each(ratio => {
                cy.wrap(ratio)
                    .should(`have.value`, `${singleRatioVal}`);
            });
        })
    })

    it(`Detailed ratios Analysis Table each ratio value is equal to corresponding Input Table value`, () => {

        let analysisParsed: number[] = [];
        let inputParsed: number[] = [];

        //  Arrange
        cy.get(DetailsPageConsts.detailedRatiosInputsClass).each((ratio, index) => {
            cy.wrap(ratio)
                .type(`{backspace}${index}`);
        });
        cy.intercept(`PUT`, `${Utils.detailedRatiosUri}/*`).as(`updateRatios`)
        cy.getDataCyElement(DetailsPageConsts.saveBtn)
            .click({ force: true })
        cy.wait(`@updateRatios`).then(() => {
            cy.reload();
        });

        //  Act 
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosAnalysisValueCell).then(analysisValueCells => {

            cy.wrap(analysisValueCells).each(singleAnalysis => {
                analysisParsed.push(parseFloat(singleAnalysis.text().trim()));
            })
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputValueCell).then(inputValueCells => {
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
})