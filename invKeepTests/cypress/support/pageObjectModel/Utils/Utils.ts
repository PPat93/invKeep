import { contains } from "cypress/types/jquery";

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
    readonly detailsPageUrl = `${this.mainPageUrl}/details`;
    readonly createPageUrl = `${this.mainPageUrl}/create`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  API URIs                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly detailedRatiosUri = `/api/detailed-ratios`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  SELECTORS                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly createAssetBtn = `create-asset`;
    readonly mainPageBtn = `home`;
    readonly appName = `app-name`;
    readonly loadingSpinner = `loading-spinner`;

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
}

export default new Utils();

export enum AssetCurrency {
    dollar = `$`,
    euro = `€`,
    pound = `£`,
    yen = `¥`
}
