const sharedJS = require ('../../invKeepFrontend/src/app/shared/sharedJS');

class AllRatios {

    constructor(detailedRatiosArray) {
         // this.createEPSClass(detailedRatiosArray);
    }

   static createEPSClass(detailedRatiosArray) {
        var objEPSratio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        return objEPSratio.determineProfitability()
    }
}

module.exports = {AllRatios}