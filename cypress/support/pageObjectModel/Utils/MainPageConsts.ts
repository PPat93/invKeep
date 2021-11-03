/**
 * 
 * MainPageConsts class containing all consts used on invKeep main page
 * @class
 * 
 */
class MainPageConsts {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  URLs                        ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly mainPageUrl = `${Cypress.config().baseUrl}`;
    readonly editPageUrl = `${this.mainPageUrl}/edit`;
    readonly detailsPageUrl = `${this.mainPageUrl}/details`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  SELECTORS                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly assetList = `asset-list`;
    readonly appName = `app-name`;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  TEXTS                       ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly assetListHeader = `Asset list:`;

}

export default new MainPageConsts();