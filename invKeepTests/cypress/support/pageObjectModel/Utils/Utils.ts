/**
 * 
 * Utility class containing all methods and variables used across diferent invKeep pages
 * @class
 * 
 */
class Utils {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  URLs                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly mainPageUrl = `${Cypress.config().baseUrl}`;
    readonly editPageUrl = `${this.mainPageUrl}/edit`;
    readonly analysisPageUrl = `${this.mainPageUrl}/analysis`;
    readonly createPageUrl = `${this.mainPageUrl}/create`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  API URIs                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly analysisRatiosUri = `/api/ratio-analysis`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  SELECTORS                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly createAssetBtn = `create-asset`;
    readonly mainPageBtn = `home`;
    readonly appName = `app-name`;
    readonly loadingSpinner = `loading-spinner`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  STYLE                       ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly stylePrimaryColor = `rgb(103, 58, 183)`;
    readonly strokedTypeBtn = `mat-stroked-button`;
    readonly raisedTypeBtn = `mat-raised-button`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  METHODS                     ////////////////////////////////////////////////////////////////////////////////////////////////////////
    visitPage(pageUrl: string) {
        cy.visit(pageUrl);
        cy.url()
            .should(`contain`, pageUrl);
        cy.getDataCyElement(this.loadingSpinner, 5000)
            .should(`not.exist`);
    }

    teardownAssets(assetTemp: string) {
        cy.apiGetAsset().then(res => {
            res.body.payload.forEach(singleItem => {
                if (singleItem.assetName.match(assetTemp)) {
                    cy.apiDeleteAssetFile(singleItem.id);
                    cy.apiDeleteAsset(singleItem.id);
                }
            })
        })
    }

    sanitizeRatioName(name) {
        return name.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase();
    }

    assertButton(btnDataCyValue: string, btnType: string, btnText: string) {
        cy.getDataCyElement(btnDataCyValue)
            .should(`be.visible`)
            .and(`have.text`, btnText)
            .and(`have.attr`, `color`, `primary`)
            .and(`have.attr`, btnType);
    }

    assertAssetCreateResponse(assetResponse, assetTestModel) {

        if (`body` in assetResponse) {

            cy.wrap(assetResponse.body)
                .should(`have.a.property`, `message`, `Asset added successfully!`);
            cy.wrap(assetResponse.body)
                .should(`have.a.property`, `assetId`)
            cy.wrap(assetResponse.body)
                .its(`assetId`).should(`be.a`, `string`);

            cy.apiGetAsset(assetResponse.body.assetId).then(res => {
                if (res.body.message === `Asset found!`) {
                    cy.assertAsset(res.body.payload, assetTestModel.assetName, assetTestModel.assetSymbol, assetTestModel.amount, assetTestModel.buyPrice, assetTestModel.currency, assetTestModel.purchaseDate);
                }
            })
        }
    }
}

export default new Utils();

export enum AssetCurrency {
    dollar = `$`,
    euro = `€`,
    pound = `£`,
    yen = `¥`
}
// TODO change enum to Union? maybe