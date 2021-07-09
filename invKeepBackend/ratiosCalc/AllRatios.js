const sharedJS = require ('../../invKeepFrontend/src/app/shared/sharedJS');
const EPSRatio = require ('./ratiosClasses/EPSRatio');
const PERatio = require ('./ratiosClasses/PERatio');

module.exports = class AllRatios {

    constructor(detailedRatiosArray) {
         // this.createEPSClass(detailedRatiosArray);
    }

   createRatios(detailedRatiosArray) {
        let objEPSRatio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        let objPERatio = new PERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pe_ratio)).valueNum);
        return [objEPSRatio.determineProfitability(objEPSRatio.final_value), objPERatio.determineProfitability(objPERatio.final_value)];
    }
}