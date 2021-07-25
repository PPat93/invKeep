const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DPRRatio extends BasicRatio {

    constructor(DPRRatio) {
        super();
        this.ratioName = `DPR Ratio`;
        this.coAnalysis = [`Dividend Yield Ratio`];
        this.description = `Dividend Payout Ratio shows comparison of total dividend pay out to net company income. 
        It sums up how much money is being returned to shareholders, reinvested, payout debts etc. 0% is for companies that 
        do not pay dividend and 100% is for companies that pays all income as dividends. This ratio is not a "game changer". 
        It adds new value to analysis, can affect it, but definitely should not be decision-defining ratio.
        Shows how much net earnings are paid as dividends, while Dividend Yields Ratio is a simple rate of return in 
        cash dividends to shareholders.`;
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