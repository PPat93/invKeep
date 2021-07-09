const BasicRatio = require ('../BasicRatio');

module.exports = class PEGRatio extends BasicRatio{

    constructor(PEGRatio) {
        super();
        this.ratioName = `PEG Ratio`;
        this.coAnalysis = [``];
        this.description = ``;
        this.additionalDetails = [
            `One of the most important metrics.`,
            `Shows how is the price of one share compared to company earnings per one share`,
            `The higher value the worse`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PEGRatio;
        this.onScaleRating = 0;
    }

    determineProfitability(PEGRatio) {
        switch (true) {
            case (PEGRatio):

                break;

            default:

        }
        return this.analysisSummary;
    }
}