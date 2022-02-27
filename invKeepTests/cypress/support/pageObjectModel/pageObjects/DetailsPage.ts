/**
 * 
 * Details page class containing all methods used on invKeep details page
 * @class
 * 
 */
class DetailsPage {

    setSingleRatioInput(ratioName: string, value: number){
        let inputFieldDataCy = ratioName.replace(' ', '-').toLowerCase() + '-input';

        cy.getDataCyElement(inputFieldDataCy)
            .type(`${value}`);
    }
}

export default new DetailsPage();
