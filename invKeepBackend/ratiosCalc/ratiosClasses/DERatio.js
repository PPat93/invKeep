const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DERatio extends BasicRatio {

    constructor(DERatio) {
        super();
        this.ratioName = `D/E Ratio`;
        this.coAnalysis = [`With other same industry companies debts ratios`];
        this.description = `Debt to Equity Ratio allows to compare total company debt with company equity. It shows level 
        of the leverage used by a firm. D/E Ratio is highly dependent from industry type and it's average - "normal" size.
        May be hard to compare stocks among different sectors. The higher D/E Ratio is, the more risky stock probably is. 
        E.g. if D/E = 1.5$ it means that on every 1$ stock has 1.5$ debt.`;
        this.additionalDetails = [
            `The higher the riskier.`,
            `Compares company's debt with equity.`,
            `Highly dependant on average industry debt.`,
            `Must be considered with other ratios.`,
            `Negative values probably indicate near bankruptcy.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = DERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Company is loosing money. Dependently from periods it is ok (e.g. during a crisis) or bad.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Amazing earnings with really low price (compared to average of american stocks from last 200 
                years - 15)`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Decent earnings with low price (compared to average of american stocks from last 200 years - 15)`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Close to average, still may be worth attention (compared to average of american stocks from 
                last 200 years - 15)`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Expensive stocks. May be a speculative bubble (compared to average of american stocks from 
                last 200 years - 15)`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: ` Really expensive stocks. Speculative bubble highly probable (compared to average of american 
                stocks from last 200 years - 15)`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 5], [5, 8], [8, 16], [16, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let totalDebt, shareholdersEquity;
    // here external def of above values for calculation
    // this.final_value = totalDebt/shareholdersEquity;
    // }
}