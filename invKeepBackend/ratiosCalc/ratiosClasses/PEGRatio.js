const BasicRatio = require ('../BasicRatio');

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
            case (PEGRatio):

                break;

            default:

        }
        return this.analysisSummary;
    }
}