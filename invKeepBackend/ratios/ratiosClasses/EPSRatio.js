const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EPSRatio extends BasicRatio {

    constructor(EPSRatio = 0) {
        super();
        this.ratioName = `EPS Ratio`;
        this.coAnalysis = [`P/E Ratio`];
        this.shortDescription = `Earnings per share (EPS) is calculated as a company's profit divided by the amount of available ` +
            `shares. The result shows profitability of the company - presenting how much was earned per one share. The higher ` +
            `${this.ratioName} the better - also because investors are usually willing to pay more for companies that present high ` +
            `${this.ratioName} value.`;
        this.extensiveDescription = `${this.ratioName} is one of the most important and known ratios. It is vital to remember to ` +
            `subtract paid preferred dividends from net company income. It is good to take an average number of company shares, ` +
            `because the amount can change thorughout the years. ${this.ratioName} may be altered on purpose (or not) by some ` +
            `factors. Let's assume that company owns two factories and after some years it came out that one of them stands on ` +
            `valueable piece of land. If management decides to sell the land and build the factory somewhere else, on less ` +
            `expensieve place, then this kind of selling would be a exceptional profit, that won't be repeated in the future. ` +
            `This kind of "extraordinary item" may distort ${this.ratioName}. The windfall events can affect EPS negatively and ` +
            `positively, especially if some variation of the formula is used. It is vital to take a closer look at ${this.ratioName} ` +
            `before assesment of it's value. Buybacks of stocks or reducing number of share also affects the ratio, same as ` +
            `changes in accointing policy. All in all, despite ${this.ratioName} is important and widely used, it is easily ` +
            `influenced intentionally and not.`;
        this.formula = [this.ratioName, `Net Income - Preferred Dividends`, `End-of-Period Common Shares Outstanding`];
        this.example = `Let's assume that The Company 1 has Net income without preffered dividends paid on $100 000, simultaneously ` +
            `with 1 000 shares. It means that ${this.ratioName} is $100 per share - The Company 1 made $100 profits on every share. ` +
            `It should be also compare with other ratios to have better context on profitability.`;
        this.bulletPointSummary = [
            `One of the most important metrics.`,
            `Shows how much company earns on most basic level.`,
            `The higher value the better.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EPSRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates a loss, 0 indicates no profits.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Significantly below average (counted as average of S&P500 from last 20 years).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Slightly below average (counted as average of S&P500 from last 20 years).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Slightly above average (counted as average of S&P500 from last 20 years).`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Significantly above average (counted as average of S&P500 from last 20 years).`,
                numberRating: 6
            }];
        this.intervals = [[-Infinity, 0], [0, 13], [13, 26], [26, 39], [39, Infinity]];
    }

    // calculate() { // future ratio more precise analysis method
    //     let netIncome, prefDividends, endShareOutstand;
    //     // here external def of above values for calculation
    //     return this.finalValue = (netIncome - prefDividends) / endShareOutstand
    // }
}
