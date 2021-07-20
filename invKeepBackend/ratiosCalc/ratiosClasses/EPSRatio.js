const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EPSRatio extends BasicRatio {

    constructor(EPSRatio = 0) {
        super();
        this.ratioName = `EPS Ratio`;
        this.coAnalysis = [`P/E Ratio`];
        this.description = `Earnings per share (EPS) is calculated as a company\'s profit divided by the outstanding shares ` +
            `of its common stock. The resulting number serves as an indicator of a company\'s profitability. It is common ` +
            `for a company to report EPS that is adjusted for extraordinary items and potential share dilution. `;
        this.additionalDetails = [
            `One of the most important metrics.`,
            `Shows how much company earns on most basic level.`,
            `The higher value the better.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = EPSRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates loss, 0 indicates no profits.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Significantly below average (counted as average of S&P500 from last 20 years).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Slightly below average (counted as average of S&P500 from last 20 years).`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Slightly above average (counted as average of S&P500 from last 20 years).`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Significantly above average (counted as average of S&P500 from last 20 years).`,
                numberRating: 6
            }];
        this.intervals = [[-Infinity, 0], [0, 13], [13, 26], [26, 39], [39, Infinity]];
    }


    // calculate() { // future ratio more precise analysis method
    //     let netIncome, prefDividends, endShareOutstand;
    //     // here external def of above values for calculation
    //     return this.final_value = (netIncome - prefDividends) / endShareOutstand
    // }
}
