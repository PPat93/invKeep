import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";

describe(`Visibility of Analysis Page elements`, () => {

    let assetName: string = `TestAsset${Date.now()}`;
    // TODO - ? - no idea - asset is not assigned to an environmental variable + more investigation
    beforeEach(`Create asset`, () => {
        cy.apiCreateAsset(assetName, `itemVis`, 10, 1.21, AssetCurrency.dollar).then(res => {

            if (res.status === 201) {
                Cypress.env('assetItem').set(assetName, res.body.assetId);
            }
        });
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    })

    afterEach(`Teardown after each test`, () => {
        Cypress.env(`assetItem`).forEach(singleAsset => {
            cy.apiDeleteAsset(singleAsset);
        })
    })

    it(`Ratios Analysis - Input table displayment - Name column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputNameCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputNameCell).each(singleCell => {
            expect(singleCell.text().length).to.be.greaterThan(1);
        })
    })

    it(`Ratios Analysis - input table displayment - Input column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputValueCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputValueCell).each(singleCell => {
            cy.wrap(singleCell)
                .find(`input`)
                .should(`be.visible`);
        })
    })

    it(`Ratios Analysis - Input table displayment - Unit column`, () => {

        let units: string[] = [`%`, `-`, `€`, `$`, `¥`, `£`];

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputUnitCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisInputUnitCell).each(singleCell => {
            expect(units).includes(singleCell.text().trim());
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Name column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisNameCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisNameCell).each(singleCell => {
            expect(singleCell.text().length).to.be.greaterThan(1);
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Value column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisValueCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisValueCell).each(singleCell => {

            let ratioValue: number;
            ratioValue = parseFloat(singleCell.text());
            expect(isNaN(ratioValue)).to.be.false;
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Analysis column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell).each(singleCell => {

            cy.wrap(singleCell)
                .should(`be.visible`);
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Analysis column - Verbal Rating`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell).each(singleCell => {

            cy.wrap(singleCell)
                .findNextDataCyElement(AnalysisPageConsts.intervalsCellVerbalRating)
                .should(`be.visible`);
            cy.wrap(singleCell).then(singleSummary => {
                cy.wrap(singleSummary)
                    .findNextDataCyElement(AnalysisPageConsts.intervalsCellVerbalRating)
                    .find(`b`)
                    .invoke(`text`)
                    .should(`not.be.empty`);
            })
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Analysis column - Summary`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell).each(singleCell => {

            cy.wrap(singleCell).then(singleSummary => {
                cy.wrap(singleSummary)
                    .findNextDataCyElement(AnalysisPageConsts.intervalsCellSummary)
                    .invoke(`text`)
                    .should(`not.be.empty`);
            })
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Analysis column - Summary have hidden overflow`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell)
            .findNextDataCyElement(AnalysisPageConsts.intervalsCellSummary)
            .contains(`Graham Number has no real intervals of values. Each case must be analyzed individually`)
            .then(grahamSummary => {
                cy.wrap(grahamSummary)
                    .scrollIntoView()
                    .should(`be.visible`)
                    .and(`have.css`, `overflow`, `hidden`)
                    .and(`have.css`, `text-overflow`, `ellipsis`)
                    .and(`have.css`, `white-space`, `nowrap`);
            })
    })

    it(`Ratios Analysis - Analysis table displayment - Analysis column - Progress Bar`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisIntervalsCell).each(singleCell => {

            cy.wrap(singleCell)
                .findNextDataCyElement(AnalysisPageConsts.intervalsNumberRating)
                .findNextDataCyElement(AnalysisPageConsts.intervalsProgressBar)
                .should(`be.visible`)
                .and(`have.attr`, `aria-valuenow`);
        })
    })

    it(`Ratios Analysis - Analysis table displayment - Aditional info column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisAdditionalData).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisAnalysisAdditionalData).each(singleCell => {

            cy.wrap(singleCell)
                .find(AnalysisPageConsts.detailsButtonClass)
                .should(`be.visible`)
                .and(`have.attr`, `color`, `accent`);
            cy.wrap(singleCell)
                .find(AnalysisPageConsts.detailsButtonClass)
                .find(`span`)
                .should(`contain.text`, `Ratio Details`);
        })
    })

    it(`Ratios Analysis - File upload section - Main elements visible at the default state`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSection)
            .should(`be.visible`)
            .and(`have.css`, `border-style`, `dashed`)
            .and(`have.css`, `border-color`, Utils.stylePrimaryColor);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadCellDescription)
            .should(`be.visible`)
            .and(`have.text`, `Upload image file for future analysis:`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadCellUpload)
            .should(`be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadCellSave)
            .should(`exist`);
        Utils.assertButton(AnalysisPageConsts.fileUploadSelectFileBtn, Utils.strokedTypeBtn, `Input`);
    })

    it(`Ratios Analysis - File upload section - Lack or invisibility of some upload elements at the default state`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .should(`not.be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
            .should(`not.be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .should(`not.exist`);
    })

    it(`Ratios Analysis - File upload section - Elements displayment after file attachment`, () => {

        // Arrange
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/valid/testImg.png`, { force: true });

        //Act & Assert
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
            .should(`not.exist`)
        Utils.assertButton(AnalysisPageConsts.fileUploadSaveButton, Utils.raisedTypeBtn, `Save`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`be.visible`)
            .and(`have.attr`, `src`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
            .should(`not.exist`);
    })
})