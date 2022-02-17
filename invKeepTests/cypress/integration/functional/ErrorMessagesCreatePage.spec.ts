import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils"

describe(`Error messages - Create Asset form - empty required`, () => {

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
})

describe(`Error messages - Create Asset form - special chars`, () => {

   let fullNameWrongData: string[] = [`,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];
    let symbolWrongData: string[] = [`/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];
    let amountWrongData: string[] = [ `.`, `-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`]
    let priceWrongData: string[] = [`-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`]
    let purchaseDateWrongData: string[] = [`.`, `-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];
    
    beforeEach(`Visit Create asset page`, () => {

        cy.visit(Utils.createPageUrl);
    })

    fullNameWrongData.forEach(singleValue => {

        it(`Error message for invalid value "Name${singleValue}" - full name field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.fullName)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`Name${singleValue}`)
                        .blur();
                })

            //  Assert
            cy.getDataCyElement(CreateEditPageConsts.fullName)
                .parentsUntil(`mat-form-field`)
                .find(`mat-error`)
                .should(`contain.text`, CreateEditPageConsts.fullNameError)
                .and(`have.attr`, `role`, `alert`)
                .and(`be.visible`);
        })
    })

    symbolWrongData.forEach(singleValue => {

        it(`Error message for invalid value "${singleValue}" - symbol field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.symbol)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`)
                        .blur();
                })

            //  Assert
            cy.getDataCyElement(CreateEditPageConsts.symbol)
                .parentsUntil(`mat-form-field`)
                .find(`mat-error`)
                .should(`contain.text`, CreateEditPageConsts.symbolError)
                .and(`have.attr`, `role`, `alert`)
                .and(`be.visible`);
        })
    })

    amountWrongData.forEach(singleValue => {

        it(`Error message for invalid value "${singleValue}" - amount field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.amount)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`)
                        .blur();
                })

            //  Assert
            cy.getDataCyElement(CreateEditPageConsts.amount)
                .parentsUntil(`mat-form-field`)
                .find(`mat-error`)
                .should(`contain.text`, CreateEditPageConsts.amountError)
                .and(`have.attr`, `role`, `alert`)
                .and(`be.visible`);
        })
    })

    priceWrongData.forEach(singleValue => {

        it(`Error message for invalid value "${singleValue}" - price field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.price)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`)
                        .blur();
                })

            //  Assert
            cy.getDataCyElement(CreateEditPageConsts.price)
                .parentsUntil(`mat-form-field`)
                .find(`mat-error`)
                .should(`contain.text`, CreateEditPageConsts.priceError)
                .and(`have.attr`, `role`, `alert`)
                .and(`be.visible`);
        })
    })
    
    purchaseDateWrongData.forEach(singleValue => {

        it(`Error message for invalid value "${singleValue}" - purchase date field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(singleValue)
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

})
