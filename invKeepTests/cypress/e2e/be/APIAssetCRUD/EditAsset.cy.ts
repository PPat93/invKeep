
describe(`API - valid asset edition`, () => {

    afterEach(`Little teardown`, () => {

    })

    it(`API - Edit an asset with a purchase date`, () => { })
    it(`API - Edit an asset with a purchase date to not have a date`, () => { })
    it(`API - Edit an asset without a purchase date`, () => { })
    it(`API - Edit an asset without a purchase date to have a date`, () => { })
    it(`API - Edit an asset two times one after another`, () => { })
    it(`API - Edit an asset with maximum value lengths - field`, () => { })
    it(`API - Edit an asset with minimum value lengths - field`, () => { })
    it(`API - Edit an asset with maximum boundry value - field`, () => { })
    it(`API - Edit an asset with minimum boundry value - field`, () => { })
    it(`API - Edit an asset to be an identical to another one`, () => { })
    it(`API - Attempt to edit an asset with additional fields`, () => { })
    it(`API - Attempt to edit asset ID during asset edition`, () => { })
})

describe(`API - attempt invalid asset edition`, () => {

    afterEach(`Little teardown`, () => {

    })

    it(`API - Attempt to edit an asset without any of the required fields`, () => { })
    it(`API - Attempt to edit an asset with an empty value for any of the required fields`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Name field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Name field`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Symbol field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Symbol field`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Amount field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Amount field`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Price field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Price field`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Currency field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Currency field`, () => { })

    it(`API - Attempt to edit an asset with an invalid datatype for Purchase Date field`, () => { })
    it(`API - Attempt to edit an asset with an invalid value for Purchase Date field`, () => { })

    it(`API - Attempt to edit an asset with too long value for any of the fields - field `, () => { })

    it(`API - Attempt to edit an asset with too short value for any of the fields - field `, () => { })

    it(`API - Attempt to edit an asset with a missing payload`, () => { })
    it(`API - Attempt to edit a non-existent asset`, () => { })
    it(`API - Attempt to edit an invalid ID asset`, () => { })
})
