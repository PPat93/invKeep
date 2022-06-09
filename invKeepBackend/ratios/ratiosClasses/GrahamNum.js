const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class GrahamNum extends BasicRatio {

    constructor(GrahamNum) {
        super();
        this.ratioName = `Graham Number`;
        this.coAnalysis = [`Indyvidually, not compared to others`];
        this.shortDescription = `${this.ratioName} responds to the question - What is the maximum value of the stock that  
            investor should maximally consider. Usually, every value below ${this.ratioName} is considered as a good 
            opportunity to buy. `;
        this.extensiveDescription = `Calculated on the basis of Book value and Earning per Share ratios. It is estimator
            of the maximum price per share, with which paid the company would be still profitable. It is one of many useful
            ratios. However, on the opposite to other ratios, it shouldn't be compared across the companies, even within 
            the industry. The only comparison that is allowed is with actual share price. Of course, ${this.ratioName} 
            may not be the only determinant of investment decision. Combined with types of ratios can be a great addition
            to overall analysis.`;
        this.formula = [this.ratioName, `SQRT(22,5 * Earnings per Share * Book Value per Share)`, `1`];
        this.example = `Let's assume that The Company 1 has EPS value equal to $10 and Book per Value equal $5. In that 
            case, ${this.ratioName} is $33.54. That value is the maximum amount that investor should pay for the share of 
            TC1. Every price share below $33.54 would be profitable and every price above that figure is deemed as 
            not worth consideration.`;
        this.bulletPointSummary = [
            `Determines maximum fair value of stock.`,
            `Stock price below ${this.ratioName} is considered as undervalued.`,
            `Different for every company.`,
            `Must be considered separately from anothers companies or averages.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = GrahamNum;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `${this.ratioName} has no real intervals of values. Each case must be analyzed individually compared with current share price. 
                Maximum profitable ${this.ratioName} is a square root of multiplication 22,5 times P/E ratio and 1.5 times P/B ratio. Above that value 
                stock most likely won't be able to bring any profits.`,
                numberRating: 3
            }];
        this.intervals = [[-Infinity, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let netIncome, sharesOutstanding, shareholdersEquity,
    // here external def of above values for calculation
    // this.finalValue = sqrt(15 * 1.5 * (netIncome/sharesOutstanding) * (shareholdersEquity/sharesOutstanding))
    // }
}