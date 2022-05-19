const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DERatio extends BasicRatio {

    constructor(DERatio) {
        super();
        this.ratioName = `D/E Ratio`;
        this.coAnalysis = [`With other same industry companies debts ratios`];
        this.shortDescription = `Debt to Equity Ratio allows to compare total company debt with company equity. It shows level 
            of the leverage used by a firm. ${this.ratioName} is highly dependent from industry type and it's average - "normal" size.
            May be hard to compare stocks among different sectors. The higher ${this.ratioName} is, the more risky stock probably is. 
            E.g. if D/E = 1.5 it means that on every 1$ stock has 1.5$ debt.`;
        this.extensiveDescription = `${this.ratioName} shows if company can cover its debts with equity. It also ilustrates how much
            leverage is used. Sometimes ${this.ratioName} may be altered to better depict long term liabilities, as they are often 
            more dangerous for the firm. Also, long-term debt and assets usually have greater impact on ${this.ratioName} than 
            short-term ones, cause long-terms are generally much higher. If short-term debt will be paid within a year, they are not
            consider risky. Hogh value of this ratio in prosperity market probably means that the company is aggressively financing 
            its growth with debt. Skullfull debt usage provides higher earnings in the future than not borrowing. However, it is 
            connected with increased risk for both business and shareholders. Comparisions of ${this.ratioName} across different 
            industries should not take place, as different capital needs and growth rates may be required. But, within industry, if
            analyzed company has significantly bigger ratio than their competitors - it is a red flag. ${this.ratioName} is a great 
            example of Gearing Ratio. It means, that it helps analysis of financial leverage, also referencing to methaphorical 
            gearing of debt and equity. ${this.ratioName} may be weak in terms of precise definition of debt and eqity. It may 
            happen that items are not always counted the same way. E.g. preferred stocks in REIT companies are usually uincluded in
            debt, while it may not happen for other industries.`;
        this.formula = [`Debt to Equity Ratio`, `Total Liabilities`, `Total Shareholders' Equity`];
        this.example = `Let's assume that The Company 1 has $2 millions debt in short-term payables (like wages, bills etc.) and 
            $1 million of long-term debt. The Company 2 has $1 million debt in short-term payables (like wages, bills etc.) and $2 
            million long-term debt. Secondly, both companies have $3 millions equity. While ${this.ratioName} is identical for both 
            of them, The Company 2 is more riskier as it has bigger long-term liabilities. Not only it is bigger, but also time 
            period cause it to be more expensive.`;
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