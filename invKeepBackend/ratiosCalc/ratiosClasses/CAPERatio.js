const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class CAPERatio extends BasicRatio {

    constructor(CAPERatio = 0) {
        super();
        this.ratioName  = `CAPE Ratio`;
        this.coAnalysis = [`-`];
        this.description = `Cyclically-Adjusted Price-to-Earnings Ratio is variation on P/E Ratio (Shiller P/E). Allows
        to asses company's capabilities of making profits during the economic cycle. Considers economy fluctuations - 
        recessions/expansions and makes easier to analyze company without them. The lower, the better - however does 
        not take into account accounting changes.`;
        this.additionalDetails = [
            `Adjusted to economic cycles.`,
            `Shows if stock is over or under valued.`,
            `The higher value the worse .`,
            `Analyzes long term company results.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = CAPERatio;
        this.onScaleRating = 0;
    }


    // calculate() { // future ratio more precise analysis method
    //     let stockPrice, 10yearInflationAdjusted;
    //     // here external def of above values for calculation
    //     return this.final_value = stockPrice / 10yearInflationAdjusted;
    // }

    determineProfitability(CAPERatio) {
        switch (true) {
            case (0 < CAPERatio <= 10):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.outstanding, `value between 0 and 10 indicates great 
                possibilities, average return  after 10 - 15 years is 11.7%`, this.onScaleRating = 6];
                break;
            case (10 < CAPERatio < 15):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.rather_good, `value between 10 and 15 indicates good 
                possibilities, average return  after 10 - 15 years is 8.7%`, this.onScaleRating = 5];
                break;
            case (15 <= CAPERatio < 20):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.ok, `value between 15 and 20 indicates quite OK 
                possibilities, average return  after 10 - 15 years is 7.2%`, this.onScaleRating = 4];
                break;
            case (20 <= CAPERatio < 25):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.neutral, `value between 20 and 25 indicates normal 
                possibilities, average return  after 10 - 15 years is 5.7%`, this.onScaleRating = 3];
                break;
            case (25 <= CAPERatio < 30):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.rather_bad, `value between 25 and 30 indicates bad 
                possibilities, average return  after 10 - 15 years is 4.1%`, this.onScaleRating = 2];
                break;
            case (30 <= CAPERatio):
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.terrible, `value between 25 and 30 indicates bad 
                possibilities, average return  after 10 - 15 years is 0.5%`, this.onScaleRating = 1];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.error, `Data is out of boundaries - value: ${CAPERatio}`, this.onScaleRating];
        }
        return this.analysisSummary;
    }
}

