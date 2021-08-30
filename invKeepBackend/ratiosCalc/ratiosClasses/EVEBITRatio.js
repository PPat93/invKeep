const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITRatio extends BasicRatio {

    constructor(EVEBITRatio) {
        super();
        this.ratioName = `EV/EBIT Ratio`;
        this.coAnalysis = [``];
        this.description = ``;
        this.additionalDetails = [
            ``,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = DERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates that company is probably on the verge of bankruptcy.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Low ratio shows little risk and reasonable debt levels.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Debt amount is close to reasonable limits. Equity is lower than total debt.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Debt is significantly higher than equity. High risk exists. Better not to buy.`,
                numberRating: 2
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, 2], [2, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let totalDebt, shareholdersEquity;
    // here external def of above values for calculation
    // this.final_value = totalDebt/shareholdersEquity;
    // }
}