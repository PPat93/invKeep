const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PEGRatio extends BasicRatio {

    constructor(PEGRatio) {
        super();
        this.ratioName = `PEG Ratio`;
        this.coAnalysis = [`P/E Ratio`, `EPS Ratio`];
        this.shortDescription = `The Price/Earnings-to-Growth ratio allows to compare one stock relative value with it's ` +
            `earnings growth throughout some period of time. This factor is a great addition for P/E Ratio. It is dependent from ` +
            `industry or company type, so should be analyzed in connection with it. It is important to know that EPS growth ` +
            `period is used.`;
        this.extensiveDescription = `Analysis of a ${this.ratioName} that has a public source means it is needed to know ` +
            `on which basis exactly it was calculated. There is a lot of possibilities to mix different subratios, and ` +
            `the results may be diverse. Ratios can be distinguished by naming: e.g. Trailing ${this.ratioName} or Forward ` +
            `${this.ratioName}.It is believed that historical data using ${this.ratioName} is less accurate than those used ` +
            `for forward ${this.ratioName}. The lower ratio, the better. Usually, values below 1 are considered to be undervalued. ` +
            `However, as always, it is depending on the industry. Negative values predicts money loss and company shrinkage.`;
        this.formula = [this.ratioName, `Price/Earnings per Share`, `Earnings per Share Growth`];
        this.example = `Let's assume we have The Company 1 that has Price to Earning equal to 10 and Earnings Per Share growth ` +
            `equal 9%, so it's ${this.ratioName} would be 10 / 9 = 1.1. The Company 2 has P/E = 6 and EPS Growth = 7. It means ` +
            `that ${this.ratioName} is 0.857. Comparison of TC1 and TC2 shows that TC1 is slightly overpriced and TC2 is a little ` +
            `undervalued. However, it depends on the industry, so it is possible that TC1 is actually better choice than TC2.`;
        this.bulletPointSummary = [
            `Complementary to PE Ratio.`,
            `Is believed to be a true stock's value.`,
            `The higher value the worse.`,
            `Can be used for future earnings estimation.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = PEGRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Company is shrinking or not creating any profits. Definitely needs more analysis.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Stock is probably undervalued. May be a good opportunity.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Stock is overvalued. One unit is is too expensive. Probably not be a good opportunity.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare, earningsPerShare
    // here external def of above values for calculation
    // this.finalValue = (oneSharePrice/earningsPerShare)/earningsPerShare
    // }
}