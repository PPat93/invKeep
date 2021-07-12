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
            `Shows how is the price of one share compared to company earnings per one share`,
            `The higher value the worse`,
            `Shows how many years you need to wait for full investment return with current earnings repeated every year.`
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PERatio;
        this.onScaleRating = 0;
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = oneSharePrice/earningsPerShare
    // }

    determineProfitability(PERatio) {
        switch (true) {
            case (PERatio < 0) || (PERatio === 0):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.depends, `Company is loosing money. Dependently from 
                periods it is ok (e.g. during a crisis) or bad.`, this.onScaleRating = 3];
                break;
            case (0 < PERatio < 5):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.outstanding, `Amazing earnings with really low price 
                (compared to average of american stocks from last 200 years - 15)`, this.onScaleRating = 6];
                break;
            case (5 <= PERatio < 8):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.rather_good, `Decent earnings with low price (compared 
                to average of american stocks from last 200 years - 15)`, this.onScaleRating = 5];
                break;
            case (8 <= PERatio < 16):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.neutral, `Close to average, still may be worth attention 
                (compared to average of american stocks from last 200 years - 15)`, this.onScaleRating = 4];
                break;
            case (16 <= PERatio < 20):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.rather_bad, `Expensive stocks. May be a speculative bubble 
                (compared to average of american stocks from last 200 years - 15)`, this.onScaleRating = 2];
                break;
            case (20 <= PERatio):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.terrible, ` Really expensive stocks. Speculative bubble
                 highly probable (compared to average of american stocks from last 200 years - 15)`, this.onScaleRating = 1];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.error, `Data is out of boundaries - value: ${PERatio}`, this.onScaleRating];
        }
        return this.analysisSummary;
    }
}