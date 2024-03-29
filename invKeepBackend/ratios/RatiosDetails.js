const SharedJS = require('../../invKeepFrontend/src/app/shared/sharedJS');
const ratiosList = require('../ratios/ratiosList.json');

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

module.exports = class RatiosDetails {


    allRatioInfoRetrieved;
    toBeRetrievedRatioDetailsClass;

    constructor(ratioName) {
        // make sure it is running appropriate class, not any script from frontend
        // TODO - 5 - can be beneficial - add some better sanitization  
        ratiosList.some(ratio => {

            // let sanitizedRatioName =  TODO

            if (ratio.url === ratioName) {
                this.toBeRetrievedRatioDetailsClass = eval('new ' + ratio.className + '()');
                return true;
            }
            // TODO - 7 - quite urgent - add some error handling if item was not found
        })
    }

    getAllRatioInfo() {

        return this.allRatioInfoRetrieved = this.toBeRetrievedRatioDetailsClass.returnaAllRatioInfos();
    }
}