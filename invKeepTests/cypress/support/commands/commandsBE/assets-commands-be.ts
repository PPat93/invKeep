import { AssetCurrency } from "../../pageObjectModel/Utils/Utils";

let assetsUrl = `/assets`

Cypress.Commands.add('apiCreateAsset', (assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) => {

    cy.request({
        method: `POST`,
        url: Cypress.env(`backendUrl`) + assetsUrl,
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
        url: Cypress.env(`backendUrl`) + assetsUrl + `/delete/` + assetId,
        failOnStatusCode: false,
        headers: {
            Accept: `application/json`
        }
    })
})

Cypress.Commands.add('apiGetAsset', (possibleItem: string = undefined) => {

    let backendUrl: string = Cypress.env(`backendUrl`) + assetsUrl;

    if (possibleItem !== undefined)
        backendUrl = backendUrl + `/` + possibleItem;

    cy.request({
        method: `GET`,
        url: backendUrl,
        failOnStatusCode: false,
        headers: {
            Accept: `application/ json`
        }
    })
})