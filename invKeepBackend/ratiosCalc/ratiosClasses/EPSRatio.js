const BasicRatio = require('../BasicRatio');

module.exports = class EPSRatio extends BasicRatio {

    constructor(EPSRatio = 0) {
        super();
        this.ratioName  = `EPS Ratio`;
        this.coAnalysis = [`P/E Ratio`];
        this.description = `Earnings per share (EPS) is calculated as a company\'s profit divided by the outstanding shares ` +
            `of its common stock. The resulting number serves as an indicator of a company\'s profitability. It is common ` +
            `for a company to report EPS that is adjusted for extraordinary items and potential share dilution. `;
        this.additionalDetails = [
            `One of the most important metrics`,
            `Shows how much company earns on most basic level`,
            `The higher value the better`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = EPSRatio;
    }


    // calculate() { // future ratio more precise analysis method
    //     let netIncome, prefDividends, endShareOutstand;
    //     // here external def of above values for calculation
    //     return this.final_value = (netIncome - prefDividends) / endShareOutstand;
    // }

    determineProfitability(EPSRatio) {
        switch (true) {
            case (EPSRatio < 0):
                this.analysisSummary = [`${this.ratioName}`, `Really bad`, `negative value indicates loss`];
                break;
            case (EPSRatio === 0):
                this.analysisSummary = [`${this.ratioName}`, `Bad`, `0 value indicates no profits`];
                break;
            case (0 < EPSRatio < 13):
                this.analysisSummary = [`${this.ratioName}`, `Rather bad`, `significantly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (13 <= EPSRatio < 26):
                this.analysisSummary = [`${this.ratioName}`, `Not really good`, `slightly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (26 <= EPSRatio < 39):
                this.analysisSummary = [`${this.ratioName}`, `Rather good`, `slightly above average (counted as average of S&P500 from last 20 years)`];
                break;
            case (39 <= EPSRatio):
                this.analysisSummary = [`${this.ratioName}`, `Outstanding`, `significantly above average (counted as average of S&P500 from last 20 years)`];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, `Error, data is out of boundaries - value: ${EPSRatio}`];
        }
        return this.analysisSummary;
    }
}

