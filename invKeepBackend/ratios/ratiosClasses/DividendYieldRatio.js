const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DividendYieldRatio extends BasicRatio {

    constructor(DividendYieldRatio) {
        super();
        this.ratioName = `Dividend Yield Ratio`;
        this.coAnalysis = [`DPR Ratio`];
        this.shortDescription = `${this.ratioName} is a percentage financial ratio showing how much is paid each year ` +
            `comparing to stock price. Dividend is not always paid. It is important that higher ${this.ratioName} may not ` +
            `indicate better stock opportunities - lowering stock price may skyrocket this ratio. Mature companies pays ` +
            `divided more often. Some industries are taxed at a higher rate. Shows simple rate of return in cash dividends ` +
            `to shareholders, while DPR shows how much net earnings are paid as dividends.`;
        this.extensiveDescription = `${this.ratioName} at higher rate is not always wanted. Bigger yields may be the reasult ` +
            `of declining stock prices. Generally, smaller companies are paying smaller dividends as dynamic growth needs a ` +
            `lot of funds. While, more mature companies are no longer developing as rapidly (also because enermous money ` +
            `would be necessary), so diviends are usually better. Dividends are usually paid quarterly, so for overall ` +
            `${this.ratioName} is multiplied by 4. However, it is not a rule and the amount of payouts is dependent from the ` +
            `company itself. Value is presented in percentage, not in real currency, so it is easy to rate the expected amount ` +
            `of return from the stock. In case that ${this.ratioName} is steadily increased thoughout the years, it is needed ` +
            `to get known ifit is because of company growth or its slow decline.`,
            this.formula = [this.ratioName, `Annual Dividends per Share * 100%`, `Price per Share`];
        this.example = `Let's assume that one share of The Company A was worth 50$ for the last year and the company paid 1$ ` +
            `dividend in total. ${this.ratioName} for The Company A is 2%. Then, The Company 2 stock price was 100$ and the ` +
            `total dividend of 1$. It's ${this.ratioName} would be 1%. As the result of the comparision The Company 1 will ` +
            `likely be more favored by the investors on the assumption that all is well with both of the companies.`;
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
                summary: `No dividend payout is not a reason to avoid stock. It is still worth to consider.`,
                numberRating: 0
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Rather low levels of ${this.ratioName} implies that company is paying low dividend or stock ` +
                    `price is too high (may be an indicator to take a closer look of price comparing to industry or market).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Interval between 2% and 6% is considered to be safe. Also it indicates that company probably ` +
                    `does not have problems with declining stock price. However, it is dependent from many more factors, so ` +
                    `must not be the only decision-determining ratio.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `${this.ratioName} above 6% may indicate company problems. It should be watched closely and ` +
                    `checked. However, sometimes companies have ${this.ratioName} on higher levels, what may imply that stock is undervalued.`,
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