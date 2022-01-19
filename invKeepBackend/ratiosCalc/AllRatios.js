const sharedJS = require('../../invKeepFrontend/src/app/shared/sharedJS');
const EPSRatio = require('./ratiosClasses/EPSRatio');
const PERatio = require('./ratiosClasses/PERatio');
const PEGRatio = require('./ratiosClasses/PEGRatio');
const DERatio = require('./ratiosClasses/DERatio');
const DividendYieldRatio = require('./ratiosClasses/DividendYieldRatio');
const DPRRatio = require('./ratiosClasses/DPRRatio');
const EVEBITDARatio = require('./ratiosClasses/EVEBITDARatio');
const EVEBITRatio = require('./ratiosClasses/EVEBITRatio');
const GrahamNum = require('./ratiosClasses/GrahamNum');
const PBRatio = require('./ratiosClasses/PBRatio');
const PSRatio = require('./ratiosClasses/PSRatio');
const ROCERatio = require('./ratiosClasses/ROCERatio');
const ROERatio = require('./ratiosClasses/ROERatio');

module.exports = class AllRatios {

    constructor(detailedRatiosArray) {
       this.createRatiosObjects(detailedRatiosArray);
    }

    createRatiosObjects(detailedRatiosArray) {
        let objCAPERatio = new PEGRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.cape_ratio)).valueNum);
        let objDERatio = new DERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.de_ratio)).valueNum);
        let objDividendYieldRatio = new DividendYieldRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.dividend_yield)).valueNum);
        let objDPRRatio = new DPRRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.dpr_ratio)).valueNum);
        let objEPSRatio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        let objEVEBITDARatio = new EVEBITDARatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ev_ebitda_ratio)).valueNum);
        let objEVEBITRatio = new EVEBITRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ev_ebit_ratio)).valueNum);
        let objGrahamNum = new GrahamNum((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.graham_num)).valueNum);
        let objPBRatio = new PBRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pb_ratio)).valueNum);
        let objPEGRatio = new PEGRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.peg_ratio)).valueNum);
        let objPERatio = new PERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pe_ratio)).valueNum);
        let objPSRatio = new PSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ps_ratio)).valueNum);
        let objROCERatio = new ROCERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.roce_ratio)).valueNum);
        let objROERatio = new ROERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.roe_ratio)).valueNum);   
    }

    analyzeRatios(){
        
    }
}