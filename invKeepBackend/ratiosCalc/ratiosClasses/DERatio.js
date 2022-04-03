const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DERatio extends BasicRatio {

    constructor(DERatio) {
        super();
        this.ratioName = `D/E Ratio`;
        this.coAnalysis = [`With other same industry companies debts ratios`];
        this.description = `Debt to Equity Ratio allows to compare total company debt with company equity. It shows level 
        of the leverage used by a firm. ${this.ratioName} is highly dependent from industry type and it's average - "normal" size.
        May be hard to compare stocks among different sectors. The higher ${this.ratioName} is, the more risky stock probably is. 
        E.g. if D/E = 1.5 it means that on every 1$ stock has 1.5$ debt.`;
        this.bulletPointSummary = [
            `The higher the riskier.`,
            `Compares company's debt with equity.`,
            `Highly dependant on average industry debt.`,
            `Must be considered with other ratios.`,
            `Negative values probably indicate near bankruptcy.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = DERatio;
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
                summary: `Debt is significantly higher than equity. Probably highly risky.`,
                numberRating: 2
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, 2], [2, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let totalDebt, shareholdersEquity;
    // here external def of above values for calculation
    // this.finalValue = totalDebt/shareholdersEquity;
    // }
}