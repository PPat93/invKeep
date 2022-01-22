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
const CAPERatio = require('./ratiosClasses/CAPERatio')

module.exports = class AllRatios {
    CAPERatio;
    objDERatio;
    objDividendYieldRatio;
    objDPRRatio;
    objEPSRatio;
    objEVEBITDARatio;
    objEVEBITRatio;
    objGrahamNum;
    objPBRatio;
    objPEGRatio;
    objPERatio;
    objPSRatio;
    objROCERatio;
    objROERatio;

    constructor(detailedRatiosArray) {
        this.CAPERatio = new CAPERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.cape_ratio)).valueNum);
        this.objDERatio = new DERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.de_ratio)).valueNum);
        this.objDividendYieldRatio = new DividendYieldRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.dividend_yield)).valueNum);
        this.objDPRRatio = new DPRRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.dpr_ratio)).valueNum);
        this.objEPSRatio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        this.objEVEBITDARatio = new EVEBITDARatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ev_ebitda_ratio)).valueNum);
        this.objEVEBITRatio = new EVEBITRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ev_ebit_ratio)).valueNum);
        this.objGrahamNum = new GrahamNum((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.graham_num)).valueNum);
        this.objPBRatio = new PBRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pb_ratio)).valueNum);
        this.objPEGRatio = new PEGRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.peg_ratio)).valueNum);
        this.objPERatio = new PERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.pe_ratio)).valueNum);
        this.objPSRatio = new PSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.ps_ratio)).valueNum);
        this.objROCERatio = new ROCERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.roce_ratio)).valueNum);
        this.objROERatio = new ROERatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.roe_ratio)).valueNum);
     }

    analyzeData(detailedRatiosArray) {
       
        return [
            this.CAPERatio.determineProfitability(this.CAPERatio.finalValue, this.CAPERatio.intervals, this.CAPERatio.intervalsData),
            this.objDERatio.returnAlldata()
        ]
    }
}