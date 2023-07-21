import { AssetRecord } from "../../../../../invKeepFrontend/src/app/shared/sharedTS";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`API - valid asset creation`, () => {

    let assetName: string = `TestAsset${Date.now().toString()}`;
    let assetDetailsCreate: AssetRecord = {
        id: ``,
        _id: ``,
        assetName: assetName,
        assetSymbol: `TAwoD`,
        amount: 12,
        buyPrice: 10.12,
        currency: AssetCurrency.euro,
        purchaseDate: `27/09/2020`
    }
    let assetLengthProperties: { name: string, maxVal: string | number, minVal: string | number }[] = [
        { name: `assetName`, maxVal: `TheMaxLengthTestAssetNameIsHer`, minVal: `Te` },
        { name: `assetSymbol`, maxVal: `Symbol`, minVal: `S` },
        { name: `amount`, maxVal: 9999999999, minVal: 1 },
        { name: `buyPrice`, maxVal: 99999.9999, minVal: 2 },
        { name: `currency`, maxVal: AssetCurrency.euro, minVal: AssetCurrency.yen },
        { name: `purchaseDate`, maxVal: `12/02/2021`, minVal: `12/02/2021` }
    ];

    afterEach(`Little teardown`, () => {

        Utils.teardownAssets(`TestAsset`);
    })

    it(`API - Create an asset with a purchase date`, () => {

        //  Arrange & Act
        cy.apiCreateAsset(assetDetailsCreate.assetName, assetDetailsCreate.assetSymbol, assetDetailsCreate.amount, assetDetailsCreate.buyPrice, assetDetailsCreate.currency, assetDetailsCreate.purchaseDate).as(`createAssetRes`);

        // Assert
        cy.get(`@createAssetRes`).then(assetResponse => {

            if (`body` in assetResponse) {

                cy.wrap(assetResponse.body)
                    .should(`have.a.property`, `message`, `Asset added successfully!`);
                cy.wrap(assetResponse.body)
                    .should(`have.a.property`, `assetId`)
                cy.wrap(assetResponse.body)
                    .its(`assetId`).should(`be.a`, `string`);

                cy.apiGetAsset().then(res => {
                    res.body.payload.forEach(singleItem => {
                        if (singleItem.assetName.match(assetName)) {
                            cy.assertAsset(singleItem, assetDetailsCreate.assetName, assetDetailsCreate.assetSymbol, assetDetailsCreate.amount, assetDetailsCreate.buyPrice, assetDetailsCreate.currency, assetDetailsCreate.purchaseDate);
                        }
                    })
                })
            }
        })
    })

    it(`API - Create an asset without a purchase date`, () => {

        //  Arrange & Act
        cy.apiCreateAsset(assetDetailsCreate.assetName, assetDetailsCreate.assetSymbol, assetDetailsCreate.amount, assetDetailsCreate.buyPrice, assetDetailsCreate.currency).as(`createAssetRes`);

        // Assert
        cy.get(`@createAssetRes`).then(assetResponse => {

            if (`body` in assetResponse) {

                cy.wrap(assetResponse.body)
                    .should(`have.a.property`, `message`, `Asset added successfully!`);
                cy.wrap(assetResponse.body)
                    .should(`have.a.property`, `assetId`)
                cy.wrap(assetResponse.body)
                    .its(`assetId`).should(`be.a`, `string`);

                cy.apiGetAsset().then(res => {
                    res.body.payload.forEach(singleItem => {
                        if (singleItem.assetName.match(assetName)) {
                            cy.assertAsset(singleItem, assetDetailsCreate.assetName, assetDetailsCreate.assetSymbol, assetDetailsCreate.amount, assetDetailsCreate.buyPrice, assetDetailsCreate.currency, `-`);
                        }
                    })
                })
            }
        })
    })

    assetLengthProperties.forEach(singleAssetField => {
        it(`API - Create an asset with maximum value lengths - ${singleAssetField.name} field`, () => {

            //  Arrange & Act
            cy.apiCreateAsset(assetDetailsCreate.assetName, assetDetailsCreate.assetSymbol, assetDetailsCreate.amount, assetDetailsCreate.buyPrice, assetDetailsCreate.currency, assetDetailsCreate.purchaseDate).as(`createAssetRes`);

        })
    })

    it(`API - Create an asset with minimum value lengths - field`, () => { })
    it(`API - Create an asset identical to another one`, () => { })
    it(`API - Attempt to create an asset with additional fields`, () => { })
    it(`API - Attempt to set asset ID during asset creation`, () => { })
})

describe(`API - attempt invalid asset creation`, () => {

    afterEach(`Little teardown`, () => {

    })

    it(`API - Attempt to create an asset without any of the required fields`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Name field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Name field`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Symbol field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Symbol field`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Amount field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Amount field`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Price field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Price field`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Currency field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Currency field`, () => { })

    it(`API - Attempt to create an asset with an invalid datatype for Purchase Date field`, () => { })
    it(`API - Attempt to create an asset with an invalid value for Purchase Date field`, () => { })

    it(`API - Attempt to create an asset with too long value for any of the fields`, () => { })

    it(`API - Attempt to create an asset with too short value for any of the fields`, () => { })

    it(`API - Attempt to create an asset with a missing payload`, () => { })
})
