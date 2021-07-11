const BasicRatio = require('../BasicRatio');

module.exports = class CAPERatio extends BasicRatio {

    constructor(EPSRatio = 0) {
        super();
        this.ratioName  = `CAPE Ratio`;
        this.coAnalysis = [``];
        this.description = `Cyclically-Adjusted Price-to-Earnings Ratio is variation on P/E Ratio (Shiller P/E). Allows
        to asses company's capabilities of making profits during the economic cycle. Considers economy fluctuations - 
        recessions/expansions and makes easier to analyze company without them. The lower, the better - however does 
        not take into account accounting changes.`;
        this.additionalDetails = [
            ``,
            ``,
            `The higher value the worse .`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = EPSRatio;
        this.onScaleRating = 0;
    }


    // calculate() { // future ratio more precise analysis method
    //     let
    //     // here external def of above values for calculation
    //     return this.final_value =
    // }

    determineProfitability(EPSRatio) {
        switch (true) {
            case (EPSRatio < 0):
                this.analysisSummary = [`${this.ratioName}`, `Really bad`, `Negative value indicates loss`, this.onScaleRating = 1];
                break;
            case (EPSRatio === 0):
                this.analysisSummary = [`${this.ratioName}`, `Bad`, `0 value indicates no profits`, this.onScaleRating = 2];
                break;
            case (0 < EPSRatio < 13):
                this.analysisSummary = [`${this.ratioName}`, `Rather bad`, `Significantly below average (counted as 
                average of S&P500 from last 20 years)`, this.onScaleRating = 3];
                break;
            case (13 <= EPSRatio < 26):
                this.analysisSummary = [`${this.ratioName}`, `Not really good`, `Slightly below average (counted as 
                average of S&P500 from last 20 years)`, this.onScaleRating = 4];
                break;
            case (26 <= EPSRatio < 39):
                this.analysisSummary = [`${this.ratioName}`, `Rather good`, `Slightly above average (counted as average 
                of S&P500 from last 20 years)`, this.onScaleRating] = 5;
                break;
            case (39 <= EPSRatio):
                this.analysisSummary = [`${this.ratioName}`, `Outstanding`, `Significantly above average (counted as 
                average of S&P500 from last 20 years)`, this.onScaleRating = 6];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, `Error`, `Data is out of boundaries - value: ${EPSRatio}`, this.onScaleRating];
        }
        return this.analysisSummary;
    }
}

