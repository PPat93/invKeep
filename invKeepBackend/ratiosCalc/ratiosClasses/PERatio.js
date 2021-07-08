const BasicRatio = require('../BasicRatio');

module.exports = class PERatio extends BasicRatio{

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
}