/**
 * 
 * Analysis page class containing all methods used on invKeep analysis page
 * @class
 * 
 */
class AnalysisPage {

    setSingleRatioInput(ratioName: string, value: number){
        let inputFieldDataCy = ratioName.replace(' ', '-').toLowerCase() + '-input';

        cy.getDataCyElement(inputFieldDataCy)
            .type(`${value}`);
    }
}

export default new AnalysisPage();
