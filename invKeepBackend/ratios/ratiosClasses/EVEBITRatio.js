const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITRatio extends BasicRatio {

    constructor(EVEBITRatio) {
        super();
        this.ratioName = `EV/EBIT Ratio`;
        this.coAnalysis = [`EV/EBITDA Ratio`];
        this.shortDescription = `It is more powerfull P/E Ratio. Whole enterprise value is compared with company's earnings ` +
            `before taxes and interests. The bigger earnings the better - whole ratio would be lower. Low ${this.ratioName} ` +
            `indicates stable and secure company. Allows easy comparison of two firms with similar operating profiles. ` +
            `The difference between EV/EBITDA is ${this.ratioName} do not incorporates depreciation and amortization.`;
        this.extensiveDescription = `Denominator of the ${this.ratioName} represents the recurring operating profit of the ` +
            `company. ${this.ratioName} does not apply to finance, insurance and real estate sectors. Denominator includes ` +
            `depreciation and amortization into ratio, so it allows to recognize them as the real costs and representation ` +
            `as the utilization of the asstes  of the company. The lower the ${this.ratioName} is, the more secure and ` +
            `stable and secure a company is. This ratio is especially useful in industries which functioning requires ` +
            `a lot of capital and depreciation or amortization is a real economic cost. `;
        this.formula = [
            this.ratioName,
            `Market capitalization + Total Debt - Cash and cash equivalents`,
            `(Net Income + Interest + Taxes) OR (Revenue - Costs of Goods Sold - Operating Expenses)`
        ];
        this.example = ` Let's assume that The Company 1 has ${this.ratioName} 12.5, The Company 2 has 24.6, The Company 3 ` +
            `has 9.2 and The Company 4 has also 9.2. In that case, The best ${this.ratioName} is for TC3 and TC4 alike, as ` +
            `their values are the lowest. Other ratios and criteria are needed to asses which one of them is better. Next ` +
            `best company is TC1, as has middle value of the ratio. The worst company on this example is TC2 with the biggest ` +
            `value of all. However, it is vital to take other ratios into account to get REALLY best of those.`;
        this.bulletPointSummary = [
            `Show stability and security of company.`,
            `Aries dependently from industry and should be analyzed on industry average basis.`,
            `The lower the better, the higher the worse.`,
            `Allows to estimate fair company value, ratio below average indicates undervalued stock.`,
            `Does not apply to finance, insurance and real estate sectors.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EVEBITRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Highly volatile. Must be analyzed individually, in connection with similar companies ` +
                    `from the same industry.`,
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