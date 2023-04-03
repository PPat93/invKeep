let ratioAnalysisUrl = `/ratio-analysis`;
let imagesUrl = `/images`;

Cypress.Commands.add('apiDeleteAssetFile', (assetId: string) => {

    cy.request({
        method: `DELETE`,
        url: Cypress.env(`backendUrl`) + ratioAnalysisUrl + `/` + assetId + imagesUrl,
        failOnStatusCode: false,
        headers: {
            Accept: `application/json`
        }
    })
})