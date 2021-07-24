const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DividendYieldRatio extends BasicRatio {

    constructor(DividendYieldRatio) {
        super();
        this.ratioName = `Dividend Yield Ratio`;
        this.coAnalysis = [``];
        this.description = `Dividend Yield Ratio is a percentage financial ratio showing how much is paid each year 
        comparing to stock price. Dividend is not always paid. It is important that higher Dividend Yields may not 
        indicate better stock opportunities - lowering stock price may skyrocket this ratio. Mature companies pays 
        divided more often. Some industries are taxed at a higher rate.`;
        this.additionalDetails = [
            `The higher, the better.`,
            `Declining stock price may falsely rise Dividend Yield Ratio.`,
            `Dividend usually amplify returns.`,
            `May be falsely high to constant stock price lowering.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = DividendYieldRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative ROCE indicates negative profitability or net operational loss - no profits. Definitely
                 avoid.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Rather low levels of ROCE implies that there is low level of company performance. It depends 
                from industry. However it does not look good.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `It is hard to say which level of ROCE is good. It highly depends from industry and the company.
                The higher - the better.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Legendary investor Warren Buffet said that ROCE above 20% is a good ROCE. The higher the better.
                In that way it also should be checked if company does not have too much cash and it s good to compare this
                ratio with other companies from an industry.`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let EBIT, capitalEmployed;
    // here external def of above values for calculation
    // this.final_value = EBIT/capitalEmployed;
    // }
}