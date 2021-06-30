class EPSRatio extends BasicRatio {

    constructor(EPSRatio = 0) {
        super();
        super.description = `Earnings per share (EPS) is calculated as a company\'s profit divided by the outstanding shares ` +
            `of its common stock. The resulting number serves as an indicator of a company\'s profitability. It is common ` +
            `for a company to report EPS that is adjusted for extraordinary items and potential share dilution. `;
        super.additionalDetails = [
            `One of the most important metrics`,
            `Shows how much company earns on most basic level`,
            `The higher value the better`,
            `Analyze with: ${super.coAnalysis}`
        ];
        super.coAnalysis = [`P/E Ratio`]
        super.final_value = EPSRatio;
    }


    calculate() {
        let netIncome, prefDividends, endShareOutstand;
        // here external def of above values for calculation
        return super.final_value = (netIncome - prefDividends) / endShareOutstand;
    }

    determineProfitability(EPSRatio = this.final_value) {
        switch (EPSRatio) {
            case (EPSRatio < 0):
                super.analysisSummary = [`Really bad`, `negative value indicates loss`];
                break;
            case (EPSRatio = 0):
                super.analysisSummary = [`Bad`, `0 value indicates no profits`];
                break;
            case (0 < EPSRatio < 13):
                super.analysisSummary = [`Rather bad`, `significantly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (13 <= EPSRatio < 26):
                super.analysisSummary = [`Not really good`, `slightly below average (counted as average of S&P500 from last 20 years)`];
                break;
            case (26<= EPSRatio <39):
                super.analysisSummary = [`Rather good`, `slightly above average (counted as average of S&P500 from last 20 years)`];
                break;
            case (39 <= EPSRatio):
                super.analysisSummary = [`Outstanding`, `significantly above average (counted as average of S&P500 from last 20 years)`];
                break;
        }
    }
}