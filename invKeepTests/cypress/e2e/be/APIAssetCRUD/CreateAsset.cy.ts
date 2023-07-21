import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`API - valid asset creation`, () => {

    let assetName: string = `TestAsset${Date.now().toString()}`;

    afterEach(`Little teardown`, () => {

        Utils.teardownAssets(`TestAsset`);
    })

    it(`API - Create an asset with a purchase date`, () => {

        //  Arrange & Act
        cy.apiCreateAsset(assetName, `TAwoD`, 12, 10.12, AssetCurrency.euro, `27/09/2020`).as(`createAssetRes`);
        cy.get(`@createAssetRes`).then(assetResponse => {

            // Assert
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
                            cy.assertAsset(singleItem, assetName, `TAwoD`, 12, 10.12, AssetCurrency.euro, `27/09/2020`);
                        }
                    })
                })
            }
        })
    })

    it(`API - Create an asset without a purchase date`, () => {

        //  Arrange & Act
        cy.apiCreateAsset(assetName, `TAwoD2`, 100, 12.05, AssetCurrency.dollar).as(`createAssetRes`);
        cy.get(`@createAssetRes`).then(assetResponse => {

            // Assert
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
                            cy.assertAsset(singleItem, assetName, `TAwoD2`, 100, 12.05, AssetCurrency.dollar, `-`);
                        }
                    })
                })
            }
        })
    })

    it(`API - Create an asset with maximum value lengths - field `, () => { })
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
