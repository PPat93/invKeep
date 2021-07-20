const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class ROERatio extends BasicRatio {

    constructor(ROERatio) {
        super();
        this.ratioName = `ROE Ratio`;
        this.coAnalysis = [`P/B Ratio`];
        this.description = `Return on Equity ratio allows to calculate company financial performance. Basically, the 
        higher, the better - above industry average is considered as good. As it takes debt  into account, it is 
        dependant on what is average for company's industry. Usually counted on last financial year, however it is 
        important to check base period. It may be influenced by inconsistent profits e.g.: if company is unprofitable 
        for several years and suddenly gains profits -ROE Ratio will skyrocket. Represented in %.`;
        this.additionalDetails = [
            `The higher, the better - above industry average is considered as good.`,
            `Allows to calculate company financial performance.`,
            `Highly dependant on industry average.`,
            `May be influenced by inconsistent profits.`,
            `Represented in %.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = ROERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Company is loosing money. Dependently from periods it is ok (e.g. during a crisis) or bad.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Amazing earnings with really low price (compared to average of american stocks from last 200 
                years - 15).`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Decent earnings with low price (compared to average of american stocks from last 200 years - 15).`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Close to average, still may be worth attention (compared to average of american stocks from 
                last 200 years - 15).`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Expensive stocks. May be a speculative bubble (compared to average of american stocks from 
                last 200 years - 15).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: ` Really expensive stocks. Speculative bubble highly probable (compared to average of american 
                stocks from last 200 years - 15).`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 5], [5, 8], [8, 16], [16, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = oneSharePrice/earningsPerShare
    // }
}