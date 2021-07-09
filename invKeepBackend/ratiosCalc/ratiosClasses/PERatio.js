const BasicRatio = require('../BasicRatio');

module.exports = class PERatio extends BasicRatio {

    constructor(PERatio) {
        super();
        this.ratioName = `P/E Ratio`;
        this.coAnalysis = [``];
        this.description = `The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures 
            its current share price relative to its per-share earnings (EPS). Determine the relative value of a company's 
            shares in an apples-to-apples comparison. Can be used to compare a company against its own historical record 
            or to compare aggregate markets against one another or over time`;
        this.additionalDetails = [
            `One of the most important metrics`,
            `Shows how much company earns on most basic level`,
            `The higher value the better`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PERatio;
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = oneSharePrice/earningsPerShare
    // }

    determineProfitability(PERatio) {
        switch (true) {
            case (PERatio < 0) || (PERatio === 0):
                this.analysisSummary = [`${this.ratioName}`, `Depends`, `Company is loosing money. Dependently from 
                periods it is ok (e.g. during a crisis) or bad.`];
                break;
            case (0 < PERatio < 5):
                this.analysisSummary = [`${this.ratioName}`, `Outstanding`, `Amazing earnings with really low price 
                (compared to average of american stocks from last 200 years - 15)`];
                break;
            case (5 <= PERatio < 8):
                this.analysisSummary = [`${this.ratioName}`, `Rather good`, `Decent earnings with low price (compared 
                to average of american stocks from last 200 years - 15)`];
                break;
            case (8 <= PERatio < 16):
                this.analysisSummary = [`${this.ratioName}`, `Neutral`, `Close to average, still may be worth attention 
                (compared to average of american stocks from last 200 years - 15)`];
                break;
            case (16 <= PERatio < 20):
                this.analysisSummary = [`${this.ratioName}`, `Bad`, `The higher, the worse. Too expensive stocks. May be
                a speculative bubble (compared to average of american stocks from last 200 years - 15)`];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, `Error, data is out of boundaries - value: ${PERatio}`];
        }
        return this.analysisSummary;
    }
}