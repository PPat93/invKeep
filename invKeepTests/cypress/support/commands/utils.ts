import { AssetRecord } from "../../../../invKeepFrontend/src/app/shared/sharedTS";
import { AssetCurrency } from "../pageObjectModel/Utils/Utils";

Cypress.Commands.add(`assertAsset`, (singleAsset: AssetRecord, assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) => {
    expect(singleAsset.assetName).equal(assetName);
    expect(singleAsset.assetSymbol).equal(assetSymbol.toUpperCase());
    expect(singleAsset.amount).equal(amount);
    expect(singleAsset.buyPrice).equal(pricePerUnit);
    expect(singleAsset.currency).equal(currency);
    expect(singleAsset.purchaseDate).equal(purchaseDate);
})