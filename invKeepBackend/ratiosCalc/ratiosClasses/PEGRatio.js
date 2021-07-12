const BasicRatio = require ('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PEGRatio extends BasicRatio{

    constructor(PEGRatio) {
        super();
        this.ratioName = `PEG Ratio`;
        this.coAnalysis = [`P/E Ratio`];
        this.description = `The Price/Earnings-to-Growth ratio allows to compare one stock relative value with it's 
        earnings growth in specified period of time. This factor is a great addition for P/E Ratio. It is dependent from 
        industry or company type, so should be analyzed in connection with it. It is important to know that EPS growth 
        period is used.`;
        this.additionalDetails = [
            `Complementary to PE Ratio.`,
            `Is believed to be a true stock's value.`,
            `The higher value the worse.`,
            `Can be used for future earnings estimation.`
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PEGRatio;
        this.onScaleRating = 0;
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = (oneSharePrice/earningsPerShare)/earningsPerShare
    // }

    determineProfitability(PEGRatio) {
        switch (true) {
            case (PEGRatio <= 0):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatiosObject.rather_bad, `Company is shrinking or not creating any 
                profits. Definitely needs more analysis.`, this.onScaleRating = 3];
                break;
            case (0 < PEGRatio <= 1):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatiosObject.outstanding, `Stock is probably undervalued. Good 
                opportunity.`, this.onScaleRating = 6];
                break;
            case (1 < PEGRatio):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatiosObject.terrible, `Stock is probably overvalued. One 
                unit is too expensive to be considered.`, this.onScaleRating = 5];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatiosObject.error, `Data is out of boundaries - value: ${PEGRatio}`, this.onScaleRating];
        }
        return this.analysisSummary;
    }
}