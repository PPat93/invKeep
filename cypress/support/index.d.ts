declare namespace Cypress {
    interface Chainable<Subject = any> {
        
        getDataCyElement(cyAttributeValue: string, customTimeout?: number): Chainable<any>
    }
}

