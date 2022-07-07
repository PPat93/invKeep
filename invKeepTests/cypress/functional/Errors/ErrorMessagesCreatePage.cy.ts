import CreateEditPage from "../../../cypress/support/pageObjectModel/pageObjects/CreateEditPage";
import CreateEditPageConsts from "../../../cypress/support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils from "../../../cypress/support/pageObjectModel/Utils/Utils"

describe(`Error messages - Create Asset form - empty required`, () => {

    let inputFieldsArray: string[][] = [
        [CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError],
        [CreateEditPageConsts.symbol, CreateEditPageConsts.symbolError],
        [CreateEditPageConsts.amount, CreateEditPageConsts.amountError],
        [CreateEditPageConsts.price, CreateEditPageConsts.priceError],
        [CreateEditPageConsts.currency, CreateEditPageConsts.currencyError]
    ];

    beforeEach(`Visit Create asset page`, () => {

        Utils.visitPage(Utils.createPageUrl);
    })

    inputFieldsArray.forEach(singleField => {

        it(`Error message for empty required ${singleField[0]} field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(singleField[0])
                .focus().then(focusedItem => {
                    cy.wrap(focusedItem).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })

                    //  Assert
                    CreateEditPage.checkErrorField(singleField[0], singleField[1]);
                })
        })
    })
})

describe(`Error messages - Create Asset form - wrong chars`, () => {

    let fullNameWrongData: string[] = [`,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];
    let symbolWrongData: string[] = [`/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];
    let amountWrongData: string[] = [`a`, `.`, `-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`]
    let priceWrongData: string[] = [`a`, `-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`]
    let purchaseDateWrongData: string[] = [`a`, `.`, `-`, `,`, `/`, `;`, `[`, `]`, `\\`, `<`, `>`, `?`, `:`, `"`, `{`, `}`, `|`, `+`, `=`, `)`, `(`, `*`, `&`, `^`, `%`, `$`, `#`, `@`, `!`, `'`];

    beforeEach(`Visit Create asset page`, () => {

        Utils.visitPage(Utils.createPageUrl);
    })

    fullNameWrongData.forEach(singleValue => {

        it(`Error message for special chars "Name${singleValue}" - full name field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.fullName)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`Name${singleValue}`).then(() => {
                            cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                                .click();
                        })
                })

            //  Assert
            CreateEditPage.checkErrorField(CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError);
        })
    })

    symbolWrongData.forEach(singleValue => {

        it(`Error message for special chars "${singleValue}" - symbol field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.symbol)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`).then(() => {
                            cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                                .click();
                        })
                })

            //  Assert
            CreateEditPage.checkErrorField(CreateEditPageConsts.symbol, CreateEditPageConsts.symbolError);
        })
    })

    amountWrongData.forEach(singleValue => {

        it(`Error message for special chars "${singleValue}" - amount field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.amount)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`).then(() => {
                            cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                                .click();
                        })
                })

            //  Assert
            CreateEditPage.checkErrorField(CreateEditPageConsts.amount, CreateEditPageConsts.amountError);
        })
    })

    priceWrongData.forEach(singleValue => {

        it(`Error message for special chars "${singleValue}" - price field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.price)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(`${singleValue}`).then(() => {
                            cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                                .click();
                        })
                })

            //  Assert
            CreateEditPage.checkErrorField(CreateEditPageConsts.price, CreateEditPageConsts.priceError);
        })
    })

    purchaseDateWrongData.forEach(singleValue => {

        it(`Error message for special chars "${singleValue}" - purchase date field`, () => {

            //  Arrange & Act
            cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
                .then(focusedItem => {
                    cy.wrap(focusedItem)
                        .type(singleValue).then(() => {
                            cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                                .click();
                        })
                })

            //  Assert
            CreateEditPage.checkErrorField(CreateEditPageConsts.purchaseDate, CreateEditPageConsts.dateError);
        })
    })
})

describe(`Error messages - Create Asset form - too short/long value`, () => {

    beforeEach(`Visit Create asset page`, () => {

        Utils.visitPage(Utils.createPageUrl);
    })

    it(`Error message for too short value (1) - full name field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`a`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError);
    })

    it(`Error message for too long value (31) - full name field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.fullName, CreateEditPageConsts.fullNameError);
    })

    it(`Error message for too long value (7) - symbol field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`aaaaaaa`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.symbol, CreateEditPageConsts.symbolError);
    })

    it(`Error message for too long value (11) - amount field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.amount)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`11111111111`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.amount, CreateEditPageConsts.amountError);
    })

    it(`Error message for too long value (11) - price field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.price)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`11111111111`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.price, CreateEditPageConsts.priceError);
    })

    it(`Error message for too long value (7) - purchase date field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.purchaseDate)
            .then(focusedItem => {
                cy.wrap(focusedItem)
                    .type(`1212121`).then(() => {
                        cy.getDataCyElement(CreateEditPageConsts.submitBtn)
                            .click();
                    })
            })

        //  Assert
        CreateEditPage.checkErrorField(CreateEditPageConsts.purchaseDate, CreateEditPageConsts.dateError);
    })
}) 