const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PERatio extends BasicRatio {

    constructor(PERatio) {
        super();
        this.ratioName = `P/E Ratio`;
        this.coAnalysis = [`EPS Ratio`, `PEG Ratio`];
        this.description = `The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures 
            its current share price relative to its per-share earnings (EPS). Determine the relative value of a company's 
            shares in an apples-to-apples comparison. Constant negative ratio may indicate bankruptcy risk.`;
        this.additionalDetails = [
            `One of the most important metrics.`,
            `Shows how is the price of one share compared to company earnings per one share.`,
            `The higher value the worse.`,
            `Shows how many years you need to wait for full investment return with current earnings repeated every year.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PERatio;
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