import CreateEditPageConsts from "../Utils/CreateEditPageConsts";
import { AssetCurrency } from "../Utils/Utils";
/**
 * 
 * Create/Edit page class containing all methods used on invKeep create or edit pages
 * @class
 * 
 */
class CreateEditpage {

    createEditAsset(assetName: string, assetSymbol: string, amount: number, pricePerUnit: number, currency: AssetCurrency, purchaseDate?: Date | string) {

        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .clear()
            .type(assetName);
        cy.getDataCyElement(CreateEditPageConsts.symbol)
            .clear()
            .type(assetSymbol);
        cy.getDataCyElement(CreateEditPageConsts.amount)
            .clear()
            .type(`${amount}`);
        cy.getDataCyElement(CreateEditPageConsts.price)
            .clear()
            .type(`${pricePerUnit}`);
        cy.getDataCyElement(CreateEditPageConsts.currency)
            .click()
        cy.get(`mat-option`)
            .contains(currency)
            .click({ force: true });
        if (purchaseDate !== undefined) {
            cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
                .clear()
                .type(`${purchaseDate}`)
        }
        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
            .click();
        cy.wait(500); // TODO - 8 - rather urgent - For some reason sometimes PUT request is interrupted if too fast moved out of page - TO BE INVESTIGATED
    }

    checkErrorField(field: string, error: string) {

        cy.getDataCyElement(field)
            .parentsUntil(`mat-form-field`)
            .find(`mat-error`)
            .should(`contain.text`, error)
            .and(`have.attr`, `role`, `alert`)
            .and(`be.visible`);
    }
}

export default new CreateEditpage();
