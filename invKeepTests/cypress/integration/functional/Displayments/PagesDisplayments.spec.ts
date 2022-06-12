import MainPageConsts from "../../../support/pageObjectModel/Utils/MainPageConsts";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import CreateEditPageConsts from "../../../support/pageObjectModel/Utils/CreateEditPageConsts";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";

describe(`Page displayments after direct access from URL`, () => {

    it(`Main page displayment`, () => {
        //  Arrange & Act
        Utils.visitPage(Utils.mainPageUrl);

        //  Assert
        cy.getDataCyElement(MainPageConsts.assetList)
            .should(`be.visible`)
            .and(`contain.text`, MainPageConsts.assetListHeader);
        cy.getDataCyElement(Utils.appName).then(logo => {
            cy.wrap(logo)
                .should(`be.visible`);
            expect(logo.text()).to.eq(`invKeep`);
        })
    })

    it(`Create Page displayment`, () => {

        //  Arrange & Act
        Utils.visitPage(Utils.createPageUrl);

        //  Assert    
        cy.url()
            .should(`contain`, Utils.createPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`)
            .and(`contain.text`, CreateEditPageConsts.createAssetFormHeader);
    })

})

describe(`Page displayments after button click access`, () => {

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    it(`Analysis Page displayment`, () => {

        let assetName: string = `TestAsset${Date.now()}`;

        //  Arrange
        Utils.visitPage(Utils.createPageUrl);
        cy.apiCreateAsset(assetName, `DetPg`, parseInt(Date.now().toString().slice(10, 12)), 1.45, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);

        //  Act
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        //  Assert
        cy.url()
            .should(`contain`, Utils.analysisPageUrl);
        cy.getDataCyElement(AnalysisPageConsts.ratiosAnalysisCard)
            .should(`be.visible`)
            .and(`contain.text`, assetName);
    })

    it(`Edit Page displayment`, () => {

        let assetName: string = `TestAsset${Date.now()}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `editPg`, 10, 11.2, AssetCurrency.pound);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();

        //  Act
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();
        cy.getDataCyElement(Utils.loadingSpinner, 5000)
            .should(`not.exist`);

        //  Assert
        cy.url()
            .should(`contain`, Utils.editPageUrl);
        cy.getDataCyElement(CreateEditPageConsts.createAssetForm)
            .should(`be.visible`);
    })
})

describe(`Visibility of Analysis Page elements`, () => {

    let assetName: string = `TestAsset${Date.now()}`;

    beforeEach(`Create asset`, () => {
        cy.apiCreateAsset(assetName, `itemVis`, 10, 1.21, AssetCurrency.dollar).then(res => {
            if (res.status === 201)
                Cypress.env("assetItem").set(assetName, res.body.assetId);
        });
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    })

    afterEach(`Teardown after each test`, () => {
        Cypress.env("assetItem").forEach(singleAsset => {
            cy.apiDeleteAsset(singleAsset);
        })
    })

    it(`Ratios Analysis - input table displayment - Name column`, () => {

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

    it(`Ratios Analysis - input table displayment - Unit column`, () => {

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
                .findNextDataCyElement(AnalysisPageConsts.ratioDetailsButton(`CAPE Ratio`))
                .should(`exist`)
                .and(`have.attr`, `color`, `accent`);
            cy.wrap(singleCell)
                .findNextDataCyElement(AnalysisPageConsts.ratioDetailsButton(`CAPE Ratio`))
                .find(`span`)
                .should(`contain.text`, `Ratio Details`);
        })
    })
})

describe(`Displayment of asset data on asset edition`, () => {

    let assetName = `TestAsset${Date.now()}`;

    let assetFullName: string[] = [`TestAsset`, `TestAsset-`, `TestAsset.`];
    let assetSymbol: string[] = [`Sym`, `Sym,m`, `Sym.m`, `Sym_m`, `Sym(m`, `Sym)m`, `Sym-m`];
    let assetPricePerUnit: number[] = [123, 12.2, 12.23];
    let assetCurrency: AssetCurrency[] = [AssetCurrency.dollar, AssetCurrency.euro, AssetCurrency.pound, AssetCurrency.yen];
    let assetPurchaseDate: string[][] = [[`12/12/2012`, `12/12/2012`], [`04.05.2010`, `4/5/2010`]];

    afterEach(`Teardown after each test`, () => {
        Cypress.env("assetItem").forEach(singleAsset => {
            cy.apiDeleteAsset(singleAsset);
        })
    })

    assetFullName.forEach(singleAssetName => {

        it(`Asset data full name in edit form displayment - ${singleAssetName} value`, () => {

            //  Arrange
            cy.apiCreateAsset(singleAssetName, `editVis`, 10, 1.21, AssetCurrency.dollar).then(res => {
                if (res.status === 201)
                    Cypress.env("assetItem").set(singleAssetName, res.body.assetId);
            });
            Utils.visitPage(Utils.mainPageUrl);

            cy.getDataCyElement(MainPage.dataCyElementAsset(singleAssetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementEditBtn(singleAssetName))
                .click();

            //  Act & Assert
            cy.getDataCyElement(CreateEditPageConsts.fullName)
                .invoke(`val`).then(text => {
                    expect(text).to.be.equal(singleAssetName)
                })
        })
    })

    assetSymbol.forEach(singleSymbol => {

        it(`Asset data symbol in edit form displayment - ${singleSymbol} value`, () => {

            //  Arrange
            cy.apiCreateAsset(assetName, singleSymbol, 10, 1.21, AssetCurrency.dollar).then(res => {
                if (res.status === 201)
                    Cypress.env("assetItem").set(assetName, res.body.assetId);
            });
            Utils.visitPage(Utils.mainPageUrl);

            cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
                .click();

            //  Act & Assert
            cy.getDataCyElement(CreateEditPageConsts.symbol)
                .invoke(`val`).then(text => {
                    expect(text).to.be.equal(singleSymbol.toUpperCase());
                })
        })
    })

    it(`Asset amount in edit form displayment - 123 value`, () => {

        //  Arrange
        cy.apiCreateAsset(assetName, `amounSym`, 123, 1.21, AssetCurrency.dollar).then(res => {
            if (res.status === 201)
                Cypress.env("assetItem").set(assetName, res.body.assetId);
        });
        Utils.visitPage(Utils.mainPageUrl);

        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
            .click();

        //  Act & Assert
        cy.getDataCyElement(CreateEditPageConsts.amount)
            .invoke(`val`).then(text => {
                expect(text).to.be.equal(`123`);
            })
    })

    assetPricePerUnit.forEach(singlePriceUnit => {

        it(`Asset price in edit form displayment - ${singlePriceUnit} value`, () => {

            //  Arrange
            cy.apiCreateAsset(assetName, `amounSym`, 123, singlePriceUnit, AssetCurrency.dollar).then(res => {
                if (res.status === 201)
                    Cypress.env("assetItem").set(assetName, res.body.assetId);
            });
            Utils.visitPage(Utils.mainPageUrl);

            cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
                .click();

            //  Act & Assert
            cy.getDataCyElement(CreateEditPageConsts.price)
                .invoke(`val`).then(text => {
                    expect(text).to.be.equal(singlePriceUnit.toString());
                })
        })
    })

    assetCurrency.forEach(singleCurrency => {

        it(`Asset currency in edit form displayment - ${singleCurrency} value`, () => {

            //  Arrange
            cy.apiCreateAsset(assetName, `amounSym`, 123, 12.2, singleCurrency).then(res => {
                if (res.status === 201)
                    Cypress.env("assetItem").set(assetName, res.body.assetId);
            });
            Utils.visitPage(Utils.mainPageUrl);

            cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
                .click();

            //  Act & Assert
            cy.getDataCyElement(CreateEditPageConsts.currency)
                .find(`span`)
                .should(`contain.text`, singleCurrency);
        })
    })

    assetPurchaseDate.forEach(singleDate => {

        it(`Asset currency in edit form displayment - ${singleDate[0]} value`, () => {

            //  Arrange
            cy.apiCreateAsset(assetName, `amounSym`, 123, 12.2, AssetCurrency.dollar, singleDate[0]).then(res => {
                if (res.status === 201)
                    Cypress.env("assetItem").set(assetName, res.body.assetId);
            });
            Utils.visitPage(Utils.mainPageUrl);

            cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
                .click();
            cy.getDataCyElement(MainPage.dataCyElementEditBtn(assetName))
                .click();

            //  Act & Assert
            cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
                .invoke(`val`).then(text => {
                    expect(text).to.be.equal(singleDate[1]);
                })
        })
    })
})
