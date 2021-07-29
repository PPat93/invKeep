const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class GrahamNum extends BasicRatio {

    constructor(GrahamNum) {
        super();
        this.ratioName = `Graham Number`;
        this.coAnalysis = [``];
        this.description = ``;
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
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = oneSharePrice/earningsPerShare
    // }
}