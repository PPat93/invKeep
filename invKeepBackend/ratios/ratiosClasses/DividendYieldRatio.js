const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DividendYieldRatio extends BasicRatio {

    constructor(DividendYieldRatio) {
        super();
        this.ratioName = `Dividend Yield Ratio`;
        this.coAnalysis = [`DPR Ratio`];
        this.shortDescription = `${this.ratioName} is a percentage financial ratio showing how much is paid each year 
            comparing to stock price. Dividend is not always paid. It is important that higher ${this.ratioName} may not 
            indicate better stock opportunities - lowering stock price may skyrocket this ratio. Mature companies pays 
            divided more often. Some industries are taxed at a higher rate. Shows simple rate of return in cash dividends 
            to shareholders, while DPR shows how much net earnings are paid as dividends.`;
        this.extensiveDescription = ``;
        this.bulletPointSummary = [
            `The higher, the better.`,
            `Declining stock price may falsely rise the ratio.`,
            `Dividend usually amplify returns.`,
            `May be falsely high to constant stock price lowering.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = DividendYieldRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.undetermined,
                summary: `No dividend  payout is not a reason to avoid stock. It is still worth to consider.`,
                numberRating: 0
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Rather low levels of ${this.ratioName} implies that company is paying low dividend or stock
                price is too high (may be an indicator to take a closer look of price comparing to industry or market)`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Interval between 2% and 6% is considered to be safe. Also it indicates that company probably 
                does not have problems with declining stock price. However, it is dependent from many more factors, so 
                must not be the only decision-determining ratio.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `${this.ratioName} above 6% may indicate company problems. It should be watched closely and
                checked. However, sometimes companies have ${this.ratioName} on higher levels, what may imply that stock is undervalued.`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 2], [2, 6], [6, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let annualDividendsPerShare, oneSharePrice;
    // here external def of above values for calculation
    // this.finalValue = annualDividendsPerShare/oneSharePrice;
    // }
}