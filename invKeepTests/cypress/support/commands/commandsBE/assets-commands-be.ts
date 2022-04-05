import { AssetCurrency } from "../../pageObjectModel/Utils/Utils";

Cypress.Commands.add('apiCreateAsset', (assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) => {

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

Cypress.Commands.add('apiDeleteAsset', (assetId: string) => {

    cy.request({
        method: `DELETE`,
        url: `${Cypress.env(`backendUrl`)}/delete/${assetId}`,
        failOnStatusCode: false,
        headers: {
            Accept: `application/json`
        }
    })
})

Cypress.Commands.add('apiGetAsset', () => {

    cy.request({
        method: `GET`,
        url: `${Cypress.env(`backendUrl`)}`,
        failOnStatusCode: false,
        headers: {
            Accept: `application/json`
        }
    })
})