import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";
import CreateEditPageConsts from "../../../support/pageObjectModel/Utils/CreateEditPageConsts";
import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";

describe(`Displayment of asset data on asset edition`, () => {

    let assetName = `TestAsset${Date.now()}`;

    let assetFullName: string[] = [`TestAsset`, `TestAsset-`, `TestAsset.`];
    let assetSymbol: string[] = [`Sym`, `Sym,m`, `Sym.m`, `Sym_m`, `Sym(m`, `Sym)m`, `Sym-m`];
    let assetPricePerUnit: number[] = [123, 12.2, 12.23];
    let assetCurrency: AssetCurrency[] = [AssetCurrency.dollar, AssetCurrency.euro, AssetCurrency.pound, AssetCurrency.yen];
    let assetPurchaseDate: string[][] = [[`12/12/2012`, `12/12/2012`], [`04.05.2010`, `4/5/2010`]];

    afterEach(`Teardown after each test`, () => {
        Cypress.env(`assetItem`).forEach(singleAsset => {
            cy.apiDeleteAsset(singleAsset);
        })
    })

    assetFullName.forEach(singleAssetName => {

        it(`Asset data full name in edit form displayment - ${singleAssetName} value`, () => {

            //  Arrange
            cy.apiCreateAsset(singleAssetName, `editVis`, 10, 1.21, AssetCurrency.dollar).then(res => {
                if (res.status === 201)
                    Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
                    Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
                Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
                    Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
                    Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
                    Cypress.env(`assetItem`).set(assetName, res.body.assetId);
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
