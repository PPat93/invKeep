const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITRatio extends BasicRatio {

    constructor(EVEBITRatio) {
        super();
        this.ratioName = `EV/EBIT Ratio`;
        this.coAnalysis = [`EV/EBITDA Ratio`];
        this.description = `It is more powerfull P/E Ratio. Whole enterprise value is compared with company's earnings
            before taxes and interests. The bigger earnings the better - whole ratio would be lower. Low ${this.ratioName}
            indicates stable and secure company. Allows easy comparison of two firms with similar operating profiles. 
            The difference between EV/EBITDA is ${this.ratioName} do not incorporaates depreciation and amortization.`;
        this.additionalDetails = [
            `Should be compared with industry average.`,
            `May by totally different across industries.`,
            `The lower the better.`,
            `Allows to estimate fair company value, ratio below average indicates undervalued stock.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EVEBITRatio;
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
    //  let enterpiseValue, ebit;
    // here external def of above values for calculation
    // this.finalValue = enterpiseValue/ebit;
    // }
}