const sharedJS = require ('../../invKeepFrontend/src/app/shared/sharedJS');
const EPSRatio = require ('./ratiosClasses/EPSRatio');
const PERatio = require ('./ratiosClasses/PERatio');
const PEGRatio = require('./ratiosClasses/PEGRatio');

module.exports = class AllRatios {

    constructor(detailedRatiosArray) {
         // this.createEPSClass(detailedRatiosArray);
    }

    createRatiosObjects(detailedRatiosArray) {
        let objEPSRatio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        let objPERatio = new PERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pe_ratio)).valueNum);
        let objPEGRatio = new PEGRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.peg_ratio)).valueNum);

    }
}