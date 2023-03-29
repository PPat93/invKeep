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
                    cy.apiDeleteAsset(singleItem.id);
                }
            })
        })
    }

    sanitizeRatioName(name) {
        return name.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase();
    }

    assertButtonPrimaryStroked(btnDataCyValue: string, btnText: string) {
        cy.getDataCyElement(btnDataCyValue)
            .should(`be.visible`)
            .and(`have.text`, btnText)
            .and(`have.attr`, `color`, `primary`)
            .and(`have.attr`, `mat-stroked-button`);
    }
}

export default new Utils();

export enum AssetCurrency {
    dollar = `$`,
    euro = `€`,
    pound = `£`,
    yen = `¥`
}
