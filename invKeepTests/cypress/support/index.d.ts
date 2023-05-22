import { AssetCurrency } from "./pageObjectModel/Utils/Utils";


declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {

            //  FRONTEND    //////////////////////////////////////////////////////////////////////////////////////////
            getDataCyElement(cyAttributeValue: string, customTimeout?: number): Chainable<any>,
            findNextDataCyElement(nextDataCyValue: string, customTimeout?: number): Chainable<any>,
            assertImageSize(fixtureImage: string, customTimeout?: number): Chainable<any>,

            //  BACKEND     //////////////////////////////////////////////////////////////////////////////////////////
            //  Assets      /////////////////
            apiCreateAsset(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string): Chainable<any>
            apiDeleteAsset(assetId: string): Chainable<any>,
            apiGetAsset(possibleItem?: string | undefined): Chainable<any>,

            //  Files       /////////////////
            apiDeleteAssetFile(assetId: string): Chainable<any>,
        }
    }
}