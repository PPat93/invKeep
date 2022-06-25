const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class CAPERatio extends BasicRatio {

    constructor(CAPERatio = 0) {
        super();
        this.ratioName = `CAPE Ratio`;
        this.coAnalysis = [`-`];
        this.shortDescription = `Cyclically-Adjusted Price-to-Earnings Ratio is variation on P/E Ratio (Shiller P/E). Allows ` +
            `to asses company's capabilities of making profits during the economic cycle. Considers economy fluctuations - ` +
            `recessions/expansions and makes easier to analyze company without them. The lower, the better. However, it does ` +
            `not involve accounting changes.`;
        this.extensiveDescription = `${this.ratioName} measures real earnings per share value throughout 10 years. It is ` +
            `showing average earnings considering inflation. Thanks to a long period of time taken into account, ratio is resistant ` +
            `to fluctuations of economic cycles. Company profit changes ocurring during recessions and high prosperity are adjusted ` +
            `with averaged inflation. That allow to present if stock price is undervalued or overvalued.`;
        this.formula = [this.ratioName, `Stock Price`, `10 years Inflation Adjusted Earnings`];
        this.example = `Let's say, that The Company share price is worth currently 1000$. Throughout the last 10 years Earning ` +
            `per Share was fluctuating from 20$ - 100$ and the inflation was between 10% - 20% depending on year. To adjust inflation, ` +
            `each years EPS should be multiplied by inflation of that year, e.g.: 100$ * (1 - 0.2) = 80$. After that all results are ` +
            `summed up and divided by 10 years - let's assume it is 58.12$. That is the 10 years Inflation Adjusted Earnings value. Last ` +
            `step is to divide Current Share price by the 10 years Inflation Adjusted Earnings value, so 1000$ / 58.12$ = 17.206. ` +
            `Value 17.206 indicates quite OK possibilities for the company on the basis of average returns of 10 - 15 years of American ` +
            `companies.`;
        this.bulletPointSummary = [
            `Adjusted to economic cycles.`,
            `Shows if stock is over or under valued.`,
            `The higher value the worse.`,
            `Analyzes long term company results, useless for companies younger than 10 years.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = CAPERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates loss, 0 indicates no profits. It probably should be avoided.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Value between 0 and 10 indicates great possibilities, average return after 10 - 15 years is 11.7%.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Value between 10 and 15 indicates good possibilities, average return after 10 - 15 years is 8.7%.`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value between 15 and 20 indicates quite OK possibilities, average return after 10 - 15 years is 7.2%.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Value between 20 and 25 indicates normal possibilities, average return after 10 - 15 years is 5.7%.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Value between 25 and 30 indicates bad possibilities, average return after 10 - 15 years is 4.1%.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Value between 25 and 30 indicates bad possibilities, average return after 10 - 15 years is 0.5%.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, Infinity]];
    }

    // calculate() { // future ratio more precise analysis method
    //     let stockPrice, 10yearInflationAdjusted;
    //     // here external def of above values for calculation
    //     return this.finalValue = stockPrice / 10yearInflationAdjusted;
    // }
}