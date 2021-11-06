import CreatePageConsts from "../Utils/CreateEditPageConsts";
import { AssetCurrency } from "../Utils/Utils";
/**
 * 
 * Create/Edit page class containing all methods used on invKeep create or edit pages
 * @class
 * 
 */
class CreateEditpage {

    createEditAsset(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) {

        cy.getDataCyElement(CreatePageConsts.fullName)
            .clear()
            .type(assetName);
        cy.getDataCyElement(CreatePageConsts.symbol)
            .clear()
            .type(assetSymbol);
        cy.getDataCyElement(CreatePageConsts.amount)
            .clear()
            .type(`${amount}`);
        cy.getDataCyElement(CreatePageConsts.price)
            .clear()
            .type(`${pricePerUnit}`);
        cy.getDataCyElement(CreatePageConsts.currency)
            .click()
        cy.get(`mat-option`)
            .contains(currency)
            .click({ force: true });
        if (purchaseDate !== undefined) {
            cy.getDataCyElement(CreatePageConsts.purchaseDate)
                .clear()
                .type(`${purchaseDate}`)
        }
        cy.getDataCyElement(CreatePageConsts.submitBtn)
            .click();
    }
}

export default new CreateEditpage();
