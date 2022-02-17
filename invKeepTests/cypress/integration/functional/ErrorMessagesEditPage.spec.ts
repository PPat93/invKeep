import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils"

describe(`Error messages - Create Asset form - empty required`, () => {

    let inputFieldsArray: string[][] = [
        [CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError],
        [CreateEditPageConsts.symbol, CreateEditPageConsts.symbolError],
        [CreateEditPageConsts.amount, CreateEditPageConsts.amountError],
        [CreateEditPageConsts.price, CreateEditPageConsts.priceError],
        [CreateEditPageConsts.currency, CreateEditPageConsts.currencyError]
    ];

    describe(`Error messages - Edit Asset form`, () => {

        beforeEach(`Visit Edit asset page`, () => {

        })

        it(``, () => {

        })

    })
})