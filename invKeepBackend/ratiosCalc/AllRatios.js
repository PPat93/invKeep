const sharedJS = require ('../../invKeepFrontend/src/app/shared/sharedJS');
const EPSRatio = require ('./EPSRatio');

module.exports = class AllRatios {

    constructor(detailedRatiosArray) {
         // this.createEPSClass(detailedRatiosArray);
    }

   createRatios(detailedRatiosArray) {
        let objEPSRatio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        return objEPSRatio.determineProfitability(objEPSRatio.final_value);
    }
}