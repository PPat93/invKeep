module.exports = class EPSRatio {

    constructor(EPSRatio = 0) {
        this.description = `Earnings per share (EPS) is calculated as a company\'s profit divided by the outstanding shares ` +
            `of its common stock. The resulting number serves as an indicator of a company\'s profitability. It is common ` +
            `for a company to report EPS that is adjusted for extraordinary items and potential share dilution. `;
        this.additionalDetails = [
            `One of the most important metrics`,
            `Shows how much company earns on most basic level`,
            `The higher value the better`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.coAnalysis = [`P/E Ratio`]
        this.final_value = EPSRatio;
    }


    calculate() {
        let netIncome, prefDividends, endShareOutstand;
        // here external def of above values for calculation
        return this.final_value = (netIncome - prefDividends) / endShareOutstand;
    }

    createEPSClass(detailedRatiosArray) {
        var objEPSratio = new EPSRatio((sharedJS.searchObject(detailedRatiosArray, sharedJS.RatiosNames.eps_ratio)).valueNum);
        return objEPSratio.determineProfitability()
    }

    determineProfitability(EPSRatio) {
        switch (EPSRatio) {
            case (EPSRatio < 0):
                this.analysisSummary = [`Really bad`, `negative value indicates loss`];
                break;
            case (EPSRatio = 0):
                this.analysisSummary = [`Bad`, `0 value indicates no profits`];
                break;
            case (0 < EPSRatio < 13):
                this.analysisSummary = [`Rather bad`, `significantly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (13 <= EPSRatio < 26):
                this.analysisSummary = [`Not really good`, `slightly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (26<= EPSRatio <39):
                this.analysisSummary = [`Rather good`, `slightly above average (counted as average of S&P500 from last 20 years)`];
                break;
            case (39 <= EPSRatio):
                this.analysisSummary = [`Outstanding`, `significantly above average (counted as average of S&P500 from last 20 years)`];
                break;
            default:
                this.analysisSummary = [`Error, data is out of boundaries + ${EPSRatio}`];
        }
        return this.analysisSummary;
    }
}

