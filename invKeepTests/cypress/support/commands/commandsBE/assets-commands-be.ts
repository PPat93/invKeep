import { AssetCurrency } from "../../pageObjectModel/Utils/Utils";

Cypress.Commands.add('apiAssetCreation', (assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) => {

    cy.request({
        method: `POST`,
        url: `${Cypress.env(`backendUrl`)}`,
        failOnStatusCode: false,
        headers: {
            Accept: `application/json`,
        },
        body: {
            "_id": "",
            "id": null,
            "assetName": assetName,
            "assetSymbol": assetSymbol,
            "amount": amount,
            "buyPrice": pricePerUnit,
            "currency": currency,
            "purchaseDate": (purchaseDate === undefined) ? `-` : purchaseDate
        },
    })
})