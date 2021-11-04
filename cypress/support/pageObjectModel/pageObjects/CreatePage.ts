import CreatePageConsts from "../Utils/CreatePageConsts";
import { AssetCurrency } from "../Utils/Utils";
/**
 * 
 * Create page class containing all methods used on invKeep create page
 * @class
 * 
 */
class CreatePage {

    createAsset(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date) {

        cy.getDataCyElement(CreatePageConsts.fullName)
            .type(assetName);
        cy.getDataCyElement(CreatePageConsts.symbol)
            .type(assetSymbol);
        cy.getDataCyElement(CreatePageConsts.amount)
            .type(`${amount}`);
        cy.getDataCyElement(CreatePageConsts.price)
            .type(`${pricePerUnit}`);
        cy.getDataCyElement(CreatePageConsts.currency)
            .click()
        cy.get(`mat-option`)
            .contains(currency)
            .click({ force: true });
        if (purchaseDate !== undefined) {
            cy.getDataCyElement(CreatePageConsts.purchaseDate)
                .type(`${purchaseDate}`)
        }
        cy.getDataCyElement(CreatePageConsts.submitBtn)
            .click();
    }
}

export default new CreatePage();
