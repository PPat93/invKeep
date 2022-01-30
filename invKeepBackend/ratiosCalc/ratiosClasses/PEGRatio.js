const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PEGRatio extends BasicRatio {

    constructor(PEGRatio) {
        super();
        this.ratioName = `PEG Ratio`;
        this.coAnalysis = [`P/E Ratio`];
        this.description = `The Price/Earnings-to-Growth ratio allows to compare one stock relative value with it's 
        earnings growth in specified period of time. This factor is a great addition for P/E Ratio. It is dependent from 
        industry or company type, so should be analyzed in connection with it. It is important to know that EPS growth 
        period is used.`;
        this.additionalDetails = [
            `Complementary to PE Ratio.`,
            `Is believed to be a true stock's value.`,
            `The higher value the worse.`,
            `Can be used for future earnings estimation.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = PEGRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Company is shrinking or not creating any profits. Definitely needs more analysis.`,
                numberRating: 2
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
    // this.finalValue = (oneSharePrice/earningsPerShare)/earningsPerShare
    // }
}