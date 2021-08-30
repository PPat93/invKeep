const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class GrahamNum extends BasicRatio {

    constructor(GrahamNum) {
        super();
        this.ratioName = `Graham Number`;
        this.coAnalysis = [``];
        this.description = `${this.ratioName} responds to the question - What is the maximum value of the stock that is 
        allowed to pay by investor? Usually, every value below ${this.ratioName} is considered as a good opportunity to 
        buy. Basically numbers shouldn't be higher than P/E Value < 22.5x and P/B Value < 1.5x`;
        this.additionalDetails = [
            ``,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = GrahamNum;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: ``,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: ``,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: ``,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: ``,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 12], [12, 16], [16, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let netIncome, sharesOutstanding, shareholdersEquity,
    // here external def of above values for calculation
    // this.final_value = sqrt(15 * 1.5 * (netIncome/sharesOutstanding) * (shareholdersEquity/sharesOutstanding))
    // }
}