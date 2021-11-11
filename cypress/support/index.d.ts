import { AssetCurrency } from "./pageObjectModel/Utils/Utils";


declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {

            //  FrontEnd /////////////////////////////////////////////////////////////////////////////////////////
            getDataCyElement(cyAttributeValue: string, customTimeout?: number): Chainable<any>,

            findNextDataCyElement(nextDataCyValue: string, customTimeout?: number): Chainable<any>,

            //  Backend  /////////////////////////////////////////////////////////////////////////////////////////
            apiAssetCreation(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date|string): Chainable<any>
        }
    }
}