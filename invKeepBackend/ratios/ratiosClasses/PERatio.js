const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PERatio extends BasicRatio {

    constructor(PERatio) {
        super();
        this.ratioName = `P/E Ratio`;
        this.coAnalysis = [`EPS Ratio`, `PEG Ratio`];
        this.shortDescription = `The Price to Earnings ratio is the ratio for valuing a company that measures ` +
            `its current share price relative to its per-share earnings (EPS). Determines the relative value of a ` +
            `company's shares in an apples-to-apples comparison. Constant negative ratio may indicate a risk of ` +
            `bankruptcy.`;
        this.extensiveDescription = `${this.ratioName} is the most videly used ratio. It can be adjusted to be ` +
            `Trailing or Forward. High value of this ratio says that company is overvalued, OR investors expect ` +
            `high earnings. The most value this ratio has is in a comparison with other businesess in industry or ` +
            `even with indexes. Longer period of times used for ${this.ratioName} compensates for business cycles ` +
            `fluctuations. Also, this ratio shows how many dollars investor needs to pay expecting one dollar ` +
            `earnings in return. It is important to know, that if a company has no earnings or loses,  ${this.ratioName} ` +
            `will usually be described as N/A. Negative ratio is rarely calculated, despite it is possible to do. ` +
            `Because of that, it is important to get known, why the ratio is 0 or N/A. Of course, as any other ratio, ` +
            `${this.ratioName} should not be the only one that is taken into the account during assesing the stock. ` +
            `Also, the ratio will be different across the industries, as there are different possibilities of money ` +
            `earnings. That's why comparisions works the best inside the industry. ${this.ratioName} can be influenced ` +
            `by many different factors. E.g. company earnings, leverage, debt, inaccurate information, deliberate ` +
            `manupulation.`;
        this.formula = [this.ratioName, `Market Value per Share`, `Earnigns per Share`];
        this.example = `Let's assume that single The Company 1 share is worth $150. It's Earnings per Share for the ` +
            `last year are $15. ${this.ratioName} for TC1 is $150/$15 = 10. This value suggest that TC1 may be a ` +
            `decent choice to invest. Assuming, of course, that it was not manipulated and other ratios are also ` +
            `good. It also mean, that investor would have to wait about 10 years to make back the invested money ` +
            `only through the company's profits.`;
        this.bulletPointSummary = [
            `One of the most important metrics.`,
            `Shows how is the price of one share compared to company earnings per one share.`,
            `The higher value the worse.`,
            `Shows how many years you need to wait for full investment return with current earnings repeated every year.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = PERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Company is loosing money. Dependently from periods it is ok (e.g. during a crisis) or bad.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Amazing earnings with really low price (compared to average of american stocks from last 200 ` +
                    `years - 15).`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Decent earnings with low price (compared to average of american stocks from last 200 years - 15).`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.neutral,
                summary: `Close to average, still may be worth attention (compared to average of american stocks from ` +
                    `last 200 years - 15).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Expensive stocks. May be a speculative bubble (compared to average of american stocks from ` +
                    `last 200 years - 15).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: ` Really expensive stocks. Speculative bubble highly probable (compared to average of american ` +
                    `stocks from last 200 years - 15).`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 5], [5, 8], [8, 16], [16, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.finalValue = oneSharePrice/earningsPerShare
    // }
}