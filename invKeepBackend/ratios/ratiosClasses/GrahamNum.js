const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class GrahamNum extends BasicRatio {

    constructor(GrahamNum) {
        super();
        this.ratioName = `Graham Number`;
        this.coAnalysis = [`Indyvidually, not compared to others`];
        this.shortDescription = `${this.ratioName} responds to the question - What is the maximum value of the stock that is 
            allowed to pay by investor? Usually, every value below ${this.ratioName} is considered as a good opportunity to 
            buy. Basically numbers shouldn't be higher than P/E Value < 15x and P/B Value < 1.5x`;
        this.extensiveDescription = ``;
        this.formula = [``, ``, ``];
        this.example = ``;
        this.bulletPointSummary = [
            `Determines fair value of stock.`,
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