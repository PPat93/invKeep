const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');
const BasicRatio = require('../BasicRatio')

module.exports = class PBRatio extends BasicRatio {

    constructor(PBRatio) {
        super();
        this.ratioName = `P/B Ratio`;
        this.coAnalysis = [`NEVER ALONE!, ROE Ratio`];
        this.description = `The Price/Book Ratio allows to see how much it is needed to pay for one share of business
        in comparison to how much one share is worth. The higher value of this parameter is, the more overvalued a 
        company is. If ${this.ratioName} is equal to 1, then price of one share is exact the same as it is really worth. However,
        low ratio may indicate that company performance is poor. Includes all liabilities and assets of the company.`;
        this.additionalDetails = [
            `Shows if company is over- or under-valued.`,
            `Low value may indicate company's poor performance.`,
            `The higher value the worse.`,
            `Does not show company's debt levels`,
            `Can be influenced by eg. buybacks, recent acquisitions etc.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PBRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Most likely company has debts, serious problems and not showing earnings. However, there is a 
                chance that it is made by e.g. a lot of buybacks. Definitely needs more analysis.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Stock is probably undervalued. Good opportunity.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Stock is probably still under or about fair value. It is definitely worth consideration.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Stock is overvalued. It is too expensive, should not be taken into account.`,
                numberRating: 2
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, 3], [3, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let marketPricePerShare, bookValuePerShare
    // here external def of above values for calculation
    // this.final_value = marketPricePerShare/bookValuePerShare
    // }
}