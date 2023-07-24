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
    let assetLengthProperties: { name: string, maxVal: string | number, minVal: string | number }[] = [
        { name: `assetName`, maxVal: `TheMaxLengthTestAssetNameIsHer`, minVal: `Te` },
        { name: `assetSymbol`, maxVal: `Symbol`, minVal: `S` },
        { name: `amount`, maxVal: 9999999999, minVal: 1 },
        { name: `buyPrice`, maxVal: 99999.9999, minVal: 2 },
        { name: `currency`, maxVal: AssetCurrency.euro, minVal: AssetCurrency.yen },
        { name: `purchaseDate`, maxVal: `12/02/2021`, minVal: `1/1/2021` }
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
            assetTestModel[singleAssetField.name] = singleAssetField.maxVal;

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
            assetTestModel[singleAssetField.name] = singleAssetField.minVal;

            //  Act
            cy.apiCreateAsset(assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate).as(`createAssetRes`);

            // Assert
            cy.get(`@createAssetRes`).then(assetResponse => {

                Utils.assertAssetCreateResponse(assetResponse, assetTestModel);
            })
        })
    })

    it(`API - Create an asset with maximum boundry value - field`, () => { })
    it(`API - Create an asset with minimum boundry value - field`, () => { })
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
