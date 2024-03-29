const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class ROCERatio extends BasicRatio {

    constructor(ROCERatio) {
        super();
        this.ratioName = `ROCE Ratio`;
        this.coAnalysis = [`ROA`, `ROE`, `ROIC`];
        this.shortDescription = `Return On Capital Employed Ratio allows for analysis of company profitability on its capital. ` +
            `It is especially useful for performance comparison of firms in capital-sensitive branch sectors, e.g. telecoms ` +
            `or utilities. Takes into account debt and equity. It shows how many profit is generated per $1. The the higher the ` +
            `value, the better profitability of the company is. Usually investor prefers companies with stable ROCE instead of ` +
            `volatile one. Can be affected by high cash resources. In this app is presented in %.`;
        this.extensiveDescription = `${this.ratioName} takes into the account both debt and equity, thanks to which performance ` +
            `of companies with a signifcant debt is properly adjusted because of it. This ratio is quite similar to ROIC Ratio, as ` +
            `both are measuring profitability per capital of the business. Importantly, ${this.ratioName} is not considering ` +
            `company's tax liabilities, so it is not that vast. It is especially helpful when multiple similar companies are ` +
            `compared on different financial metrics. If the analysisis conducted with ROA, ROIC and ROE ratios, then values ` +
            `are comprehensive and are complementing each other. However, ROE and ROA are better and more complete indicators ` +
            `that can asses a company on their own.`;
        this.formula = [
            this.ratioName,
            `(Net Income + Interest + Taxes) OR (Revenue - Costs of Goods Sold - Operating Expenses)`,
            `Capital Employed`
        ];
        this.example = `Let's assume that The Company 1 has: EBIT = $4 000 and Capital employed = $9 000. We also have ` +
            `The Company 2 that has: EBIT = $14 000, and Capital employed = $90 000. In those cases, ${this.ratioName} for TC1 ` +
            `is 44% and for TC2 is 15%. So, despite TC2 looks like a bigger and better company, it is only generating 15 cents ` +
            `per capital dollar, while 'smaller' TC1 is creating 44 cents per capital dollar. If only this ratio would be taken ` +
            `into the account, TC1 would be better choice than TC2.`;
        this.bulletPointSummary = [
            `The higher, the better.`,
            `Allows comparison between capital-sensitive industry companies.`,
            `Better than ROE or ROA on longer period of time.`,
            `Can be affected by high money amounts.`,
            `Represented in %.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = ROCERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative ${this.ratioName} indicates negative profitability or net operational loss - no profits. Definitely ` +
                    `avoid.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Rather low levels of ${this.ratioName} implies that there is low level of company performance. It depends ` +
                    `from industry. However it does not look good.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `It is hard to say which level of ${this.ratioName} is good. It highly depends from industry and the company. ` +
                    `The higher - the better.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Legendary investor Warren Buffet said that ${this.ratioName} above 20% is a good ${this.ratioName}. ` +
                    `The higher the better. In that way it also should be checked if company does not have too much cash and ` +
                    `it s good to compare this ratio with other companies from an industry.`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let EBIT, capitalEmployed;
    // here external def of above values for calculation
    // this.finalValue = EBIT/capitalEmployed;
    // }
}