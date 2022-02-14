import MainPageConsts from "../../support/pageObjectModel/Utils/MainPageConsts";
import Utils, { AssetCurrency } from "../../support/pageObjectModel/Utils/Utils";
import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import DetailsPageConsts from "../../support/pageObjectModel/Utils/DetailsPageConsts";
import MainPage from "../../support/pageObjectModel/pageObjects/MainPage";

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

    it(`Details Page displayment`, () => {

        let assetName = `TestAsset${Date.now()}`;

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
            .should(`contain`, Utils.detailsPageUrl);
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosCard)
            .should(`be.visible`)
            .and(`contain.text`, assetName);
    })

    it(`Edit Page displayment`, () => {

        let assetName = `TestAsset${Date.now()}`;

        //  Arrange
        cy.apiCreateAsset(assetName, `editPg`, 10, 11.2, AssetCurrency.pound);
        cy.visit(Utils.mainPageUrl);
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

describe(`Visibility of Detailed Page elements`, () => {

    let assetName = `TestAsset${Date.now()}`;

    beforeEach(`Create asset`, () => {
        cy.apiCreateAsset(assetName, `itemVis`, 10, 1.21, AssetCurrency.dollar).then(res => {
            if (res.status === 201)
                Cypress.env("assetItem").set(assetName, res.body.assetId);
        });
        cy.visit(Utils.mainPageUrl);
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

    it(`Detailed ratios input table displayment - Name column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputNameCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputNameCell).each(singleCell => {
            expect(singleCell.text().length).to.be.greaterThan(1);
        })
    })

    it(`Detailed ratios input table displayment - Input column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputValueCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputValueCell).each(singleCell => {
            cy.wrap(singleCell)
                .find(`input`)
                .should(`be.visible`);
        })
    })

    it(`Detailed ratios input table displayment - Unit column`, () => {

        let units = [`%`, `-`, `€`, `$`, `¥`, `£`];

        // Arrange, Act & Assert
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputUnitCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosInputUnitCell).each(singleCell => {
            expect(units).includes(singleCell.text().trim());
        })
    })

    it(`Detailed ratios analysis table displayment - Name column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosAnalysisNameCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosAnalysisNameCell).each(singleCell => {
            expect(singleCell.text().length).to.be.greaterThan(1);
        })
    })

    it(`Detailed ratios analysis table displayment - Value column`, () => {

        // Arrange, Act & Assert
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosAnalysisValueCell).then(allCells => {
            cy.wrap(allCells)
                .should(`have.length`, 14);
        })
        cy.getDataCyElement(DetailsPageConsts.detailedRatiosAnalysisValueCell).each(singleCell => {

            let ratioValue;
            ratioValue = parseFloat(singleCell.text());
            expect(isNaN(ratioValue)).to.be.false;
        })
    })
})