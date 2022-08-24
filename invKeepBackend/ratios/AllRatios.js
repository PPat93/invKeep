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
const CAPERatio = require('./ratiosClasses/CAPERatio');

// TODO - 1 - not urgent - add some group import used multiple times like index.js

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

    constructor(ratiosAnalysisArray) {
        this.CAPERatio = new CAPERatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.cape_ratio)).valueNum);
        this.objDERatio = new DERatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.de_ratio)).valueNum);
        this.objDividendYieldRatio = new DividendYieldRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.dividend_yield_ratio)).valueNum);
        this.objDPRRatio = new DPRRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.dpr_ratio)).valueNum);
        this.objEPSRatio = new EPSRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        this.objEVEBITDARatio = new EVEBITDARatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.ev_ebitda_ratio)).valueNum);
        this.objEVEBITRatio = new EVEBITRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.ev_ebit_ratio)).valueNum);
        this.objGrahamNum = new GrahamNum((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.graham_num)).valueNum);
        this.objPBRatio = new PBRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.pb_ratio)).valueNum);
        this.objPEGRatio = new PEGRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.peg_ratio)).valueNum);
        this.objPERatio = new PERatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.pe_ratio)).valueNum);
        this.objPSRatio = new PSRatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.ps_ratio)).valueNum);
        this.objROCERatio = new ROCERatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.roce_ratio)).valueNum);
        this.objROERatio = new ROERatio((sharedJS.searchObject(ratiosAnalysisArray, sharedJS.RatiosNames.roe_ratio)).valueNum);
    }

    analyzeData() {
        return [
            this.CAPERatio.returnAllAnalyzedData(),
            this.objDERatio.returnAllAnalyzedData(),
            this.objDividendYieldRatio.returnAllAnalyzedData(),
            this.objDPRRatio.returnAllAnalyzedData(),
            this.objEPSRatio.returnAllAnalyzedData(),
            this.objEVEBITDARatio.returnAllAnalyzedData(),
            this.objEVEBITRatio.returnAllAnalyzedData(),
            this.objGrahamNum.returnAllAnalyzedData(),
            this.objPBRatio.returnAllAnalyzedData(),
            this.objPEGRatio.returnAllAnalyzedData(),
            this.objPERatio.returnAllAnalyzedData(),
            this.objPSRatio.returnAllAnalyzedData(),
            this.objROCERatio.returnAllAnalyzedData(),
            this.objROERatio.returnAllAnalyzedData()
        ]
    }
}