import { AssetCurrency } from "./pageObjectModel/Utils/Utils";


declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {

            //  FrontEnd /////////////////////////////////////////////////////////////////////////////////////////
            getDataCyElement(cyAttributeValue: string, customTimeout?: number): Chainable<any>,

            findNextDataCyElement(nextDataCyValue: string, customTimeout?: number): Chainable<any>,

            //  Backend  /////////////////////////////////////////////////////////////////////////////////////////
            apiCreateAsset(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string): Chainable<any>

            apiDeleteAsset(assetId: string): Chainable<any>,

            apiGetAsset(possibleItem?: string | undefined): Chainable<any>,
        }
    }
}