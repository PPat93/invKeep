import CreateEditPageConsts from "../../support/pageObjectModel/Utils/CreateEditPageConsts";
import Utils from "../../support/pageObjectModel/Utils/Utils"

describe(`Error messages - Create Asset form`, () => {

    beforeEach(`Visit Create asset page`, () => {

        cy.visit(Utils.createPageUrl);
    })

    it(`Error message after empty required full name field`, () => {

        //  Arrange & Act
        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .click().then(focusedItem => {
                cy.wrap(focusedItem)
                    .blur();
            })

        //  Assert
        cy.getDataCyElement(CreateEditPageConsts.fullName)
            .parentsUntil(`mat-form-field`)
            .find(`mat-error`)
            .should(`contain.text`, CreateEditPageConsts.fullNameError);
    })
})

describe(`Error messages - Edit Asset form`, () => {

    beforeEach(`Visit Edit asset page`, () => {

    })

    it(``, () => {

    })
})