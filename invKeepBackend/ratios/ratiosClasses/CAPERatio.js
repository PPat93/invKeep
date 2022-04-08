const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class CAPERatio extends BasicRatio {

    constructor(CAPERatio = 0) {
        super();
        this.ratioName = `CAPE Ratio`;
        this.coAnalysis = [`-`];
        this.shortDescription = `Cyclically-Adjusted Price-to-Earnings Ratio is variation on P/E Ratio (Shiller P/E). Allows
            to asses company's capabilities of making profits during the economic cycle. Considers economy fluctuations - 
            recessions/expansions and makes easier to analyze company without them. The lower, the better. However, it does 
            not involve accounting changes.`;
        this.extensiveDescription = ``;
        this.bulletPointSummary = [
            `Adjusted to economic cycles.`,
            `Shows if stock is over or under valued.`,
            `The higher value the worse.`,
            `Analyzes long term company results.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = CAPERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates loss, 0 indicates no profits. It probably should be avoided.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Value between 0 and 10 indicates great possibilities, average return after 10 - 15 years is 11.7%.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Value between 10 and 15 indicates good possibilities, average return after 10 - 15 years is 8.7%.`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value between 15 and 20 indicates quite OK possibilities, average return after 10 - 15 years is 7.2%.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Value between 20 and 25 indicates normal possibilities, average return after 10 - 15 years is 5.7%.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Value between 25 and 30 indicates bad possibilities, average return after 10 - 15 years is 4.1%.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Value between 25 and 30 indicates bad possibilities, average return after 10 - 15 years is 0.5%.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, Infinity]];
    }



    // calculate() { // future ratio more precise analysis method
    //     let stockPrice, 10yearInflationAdjusted;
    //     // here external def of above values for calculation
    //     return this.finalValue = stockPrice / 10yearInflationAdjusted;
    // }
}

