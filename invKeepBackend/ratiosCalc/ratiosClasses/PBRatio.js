const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');
const BasicRatio = require('../BasicRatio')

module.exports = class PBRatio extends BasicRatio {

    constructor(PBRatio) {
        super();
        this.ratioName = `P/B Ratio`;
        this.coAnalysis = [`NEVER ALONE!`];
        this.description = `The Price/Book Ratio allows to see how much it is needed to pay for one share of business
        in comparison to how much one share is worth. The higher value of this parameter is, the more overvalued a 
        company is. If P/B Ratio is equal to 1, then price of one share is exact the same as it is really worth. However,
        low ratio may indicate that company performance is poor. Includes all liabilities and assets of the company.`;
        this.additionalDetails = [
            `Shows if company is over- or under-valued`,
            `Low value may indicate company's poor performance.`,
            `The higher value the worse.`,
            `Does not show company's debt levels`,
            `Can be influenced by eg. buybacks, recent acquisitions etc.`
                `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PBRatio;
        this.onScaleRating = 0;
    }

    // calculate(){ // future ratio more precise analysis method
    //  let marketPricePerShare, bookValuePerShare
    // here external def of above values for calculation
    // this.final_value = (oneSharePrice/earningsPerShare)/earningsPerShare
    // }

    determineProfitability(PBRatio) {
        switch (true) {
            case (PBRatio <= 0):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.rather_bad, `Company is shrinking or not creating any 
                profits. Definitely needs more analysis.`, this.onScaleRating = 3];
                break;
            case (0 < PBRatio <= 1):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.outstanding, `Stock is probably undervalued. Good 
                opportunity.`, this.onScaleRating = 6];
                break;
            case (1 < PBRatio):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.terrible, `Stock is probably overvalued. One 
                unit is too expensive to be considered.`, this.onScaleRating = 5];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.error, `Data is out of boundaries - value: ${PBRatio}`, this.onScaleRating];
        }
        return this.analysisSummary;
    }
}