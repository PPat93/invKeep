const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITRatio extends BasicRatio {

    constructor(EVEBITRatio) {
        super();
        this.ratioName = `EV/EBIT Ratio`;
        this.coAnalysis = [`EV/EBITDA Ratio`];
        this.shortDescription = `It is more powerfull P/E Ratio. Whole enterprise value is compared with company's earnings
            before taxes and interests. The bigger earnings the better - whole ratio would be lower. Low ${this.ratioName}
            indicates stable and secure company. Allows easy comparison of two firms with similar operating profiles. 
            The difference between EV/EBITDA is ${this.ratioName} do not incorporates depreciation and amortization.`;
        this.extensiveDescription = ``;
        this.formula = [`EV/EBIT Ratio`, `Market capitalization + Total Debt - Cash and cash equivalents`, `(Net Income + Interest + Taxes) OR (Revenue - Costs of Goods Sold - Operating Expenses)`];
        this.example = ``;
        this.bulletPointSummary = [
            `Show stability and security of company.`,
            `aries dependently from industry and should be analyzed on industry average basis.`,
            `The lower the better, the higher the worse.`,
            `Allows to estimate fair company value, ratio below average indicates undervalued stock.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EVEBITRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Highly volatile. Must be analyzed individually, in connection with similar companies
                    from the same industry.`,
                numberRating: 3
            }];
        this.intervals = [[-Infinity, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let enterpiseValue, ebit;
    // here external def of above values for calculation
    // this.finalValue = enterpiseValue/ebit;
    // }
}