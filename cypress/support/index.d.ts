declare namespace Cypress {
    interface Chainable<Subject = any> {
        
        getDataCyElement(cyAttributeValue: string): Chainable<any>
    }
}

