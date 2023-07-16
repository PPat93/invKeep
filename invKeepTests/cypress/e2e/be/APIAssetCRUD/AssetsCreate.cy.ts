
describe(`API - valid asset creation`, () => {

    afterEach(`Little teardown`, () => {

    })

    it(`API - Create an asset without purchase date`, () => { })
    it(`API - Create an asset with purchase date`, () => { })
    it(`API - Create an asset with maximum value lengths`, () => { })
    it(`API - Create an asset with minimum value lengths`, () => { })
    it(`API - Create an asset identical to another one`, () => { })
    it(`API - Attempt to create an asset with additional fields`, () => { })
    it(`API - Attempt to set asset ID during asset creation`, () => { })
})

describe(`API - attempt invalid asset creation`, () => {

    afterEach(`Little teardown`, () => {

    })

    it(`API - Attempt to create an asset without any of the required fields`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Name field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Name field`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Symbol field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Symbol field`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Amount field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Amount field`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Price field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Price field`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Currency field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Currency field`, () => { })

    it(`API - Attempt to create an asset with invalid datatype for Purchase Date field`, () => { })
    it(`API - Attempt to create an asset with invalid value for Purchase Date field`, () => { })

    it(`API - Attempt to create an asset with too long value for any of the fields`, () => { })

    it(`API - Attempt to create an asset with too short value for any of the fields`, () => { })

    it(`API - Attempt to create an asset with missing payload`, () => { })
})
