import { AssetRecord } from "../../../../../invKeepFrontend/src/app/shared/sharedTS";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`API - valid asset creation`, () => {

    let assetName: string = `TestAsset${Date.now().toString()}`;
    let assetBase: AssetRecord = {
        id: ``,
        _id: ``,
        assetName: assetName,
        assetSymbol: `TAwoD`,
        amount: 12,
        buyPrice: 10.12,
        currency: AssetCurrency.euro,
        purchaseDate: `27/09/2020`
    }
    let assetLengthProperties: { name: string, maxValLen: string | number, minValLen: string | number }[] = [
        { name: `assetName`, maxValLen: `TheMaxLengthTestAssetNameIsHer`, minValLen: `Te` },
        { name: `assetSymbol`, maxValLen: `Symbol`, minValLen: `S` },
        { name: `amount`, maxValLen: 9999999999, minValLen: 1 },
        { name: `buyPrice`, maxValLen: 99999.9999, minValLen: 2 },
        { name: `currency`, maxValLen: AssetCurrency.euro, minValLen: AssetCurrency.yen },
        { name: `purchaseDate`, maxValLen: `12/02/2021`, minValLen: `1/1/2021` }
    ];
    let assetTestModel = { ...assetBase };

    afterEach(`Little teardown`, () => {

        assetTestModel = { ...assetBase };
        Utils.teardownAssets(`TestAsset`);
    })

    it(`API - Create an asset with a purchase date`, () => {

        //  Arrange & Act
        cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes`);

        // Assert
        cy.get(`@createAssetRes`).then(assetResponse => {

            Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
        })
    })

    it(`API - Create an asset without a purchase date`, () => {

        //  Arrange 
        assetTestModel.purchaseDate = `-`;

        //  Act
        cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency).as(`createAssetRes`);

        // Assert
        cy.get(`@createAssetRes`).then(assetResponse => {

            Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
        })
    })

    assetLengthProperties.forEach(singleAssetField => {
        it(`API - Create an asset with maximum value lengths - ${singleAssetField.name} field`, () => {

            //  Arrange 
            assetTestModel[singleAssetField.name] = singleAssetField.maxValLen;

            //  Act
            cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes`);

            // Assert
            cy.get(`@createAssetRes`).then(assetResponse => {

                Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
            })
        })
    })

    assetLengthProperties.forEach(singleAssetField => {
        it(`API - Create an asset with minimum value lengths - ${singleAssetField.name} field`, () => {

            //  Arrange 
            assetTestModel[singleAssetField.name] = singleAssetField.minValLen;

            //  Act
            cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes`);

            // Assert
            cy.get(`@createAssetRes`).then(assetResponse => {

                Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
            })
        })
    })

    it(`API - Create an asset identical to another one`, () => {

        //  Act && Arrange
        cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes`);
        cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes2`);

        // Assert
        cy.get(`@createAssetRes`).then(assetResponse => {
            cy.get(`@createAssetRes2`).then(assetResponse2 => {

                Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
                Utils.assertAssetCreateResponse(assetResponse2, assetTestModel);
                
                expect(assetResponse.body.assetId).not.equal(assetResponse2.body.assetId)

            })
        })
    })
    it(`API - Create an asset with maximum boundry value - field`, () => { })
    it(`API - Create an asset with minimum boundry value - field`, () => { })
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
