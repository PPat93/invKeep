import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils"

describe(`Error messages - Create Asset form`, () => {

    let inputFieldsArray: string[][] = [
        [CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError],
        [CreateEditPageConsts.symbol, CreateEditPageConsts.symbolError],
        [CreateEditPageConsts.amount, CreateEditPageConsts.amountError],
        [CreateEditPageConsts.price, CreateEditPageConsts.priceError],
        [CreateEditPageConsts.currency, CreateEditPageConsts.currencyError]
    ];

    beforeEach(`Visit Create asset page`, () => {

        cy.visit(Utils.createPageUrl);
    })

    inputFieldsArray.forEach(singleField => {

        it(`Error message for empty required ${singleField[0]} field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(singleField[0])
                .focus().then(focusedItem => {
                    cy.wrap(focusedItem)
                        .blur();
                })

            //  Assert
            cy.getDataCyElement(singleField[0])
                .parentsUntil(`mat-form-field`)
                .find(`mat-error`)
                .should(`contain.text`, singleField[1])
                .and(`have.attr`, `role`, `alert`)
                .and(`be.visible`);
        })
    })

    inputFieldsArray.forEach(singleField => {

        it(`Error message for invalid values for ${singleField[0]} field`, () => {

        })
    })

    it(`Error message for invalid value for purchase date field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`wrongData`)
                    .blur();
            })

        //  Assert
        cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
            .parentsUntil(`mat-form-field`)
            .find(`mat-error`)
            .should(`contain.text`, CreateEditPageConsts.dateError)
            .and(`have.attr`, `role`, `alert`)
            .and(`be.visible`);
    })
})

describe(`Error messages - Edit Asset form`, () => {

    beforeEach(`Visit Edit asset page`, () => {

    })

    it(``, () => {

    })
})