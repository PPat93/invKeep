const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DPRRatio extends BasicRatio {

    constructor(PEGRatio) {
        super();
        this.ratioName = `DPR Ratio`;
        this.coAnalysis = [``];
        this.description = ``;
        this.additionalDetails = [
            ``,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = DPRRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Company is shrinking or not creating any profits. Definitely needs more analysis.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Stock is probably undervalued. Good opportunity.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Stock is probably overvalued. One unit is too expensive to be considered.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = (oneSharePrice/earningsPerShare)/earningsPerShare
    // }
}