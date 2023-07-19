import { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`API - valid asset creation`, () => {

    let assetName: string = `TestAsset${Date.now().toString().slice(10, 12)}`;

    afterEach(`Little teardown`, () => {

    })

    it.only(`API - Create an asset with a purchase date`, () => {

        cy.intercept(`POST`,`/api/assets`).as(`createAssetRes`);

        cy.apiCreateAsset(assetName, `TAwoD`, 12, 10.12, AssetCurrency.euro);

        cy.wait(`@createAssetRes`).then(assetResponse => {
            cy.wrap(assetResponse)
                .should(`have.a.property`, `message`, `Asset added successfully!`);
            cy.wrap(assetResponse)
                .should(`have.a.property`, `assetId`)
            cy.wrap(assetResponse)
                .its(`assetId`).should(`be.a`, `string`);
        })
    })

    it(`API - Create an asset without a purchase date`, () => { })
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
