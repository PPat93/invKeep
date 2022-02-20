/**
 * 
 * CreateEditPageConsts class containing all consts used on invKeep create asset page
 * @class
 * 
 */
class CreateEditPageConsts {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  SELECTORS                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly createAssetForm = `create-form`;
    readonly fullName = `full-name`;
    readonly symbol = `symbol`;
    readonly amount = `amount`;
    readonly price = `price`;
    readonly currency = `currency`;
    readonly purchaseDate = `purchase-date`;

    readonly submitBtn = `submit`;
    readonly cleartBtn = `clear`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  TEXTS                       ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly createAssetFormHeader = `Create asset:`;

    readonly fullNameError = `Please provide valid asset name.`;
    readonly symbolError = `Please provide valid asset symbol.`;
    readonly amountError = `Please provide valid whole number amount.`;
    readonly priceError = `Please provide valid price.`;
    readonly currencyError = `Please select valid currency.`;
    readonly dateError = `Provided date is invalid.`;
}

export default new CreateEditPageConsts();