const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class DPRRatio extends BasicRatio {

    // TODO - change DPR Ratio to DP Ratio all caross the app
    constructor(DPRRatio) {
        super();
        this.ratioName = `DPR Ratio`;
        this.coAnalysis = [`Dividend Yield Ratio`];
        this.shortDescription = `Dividend Payout Ratio shows comparison of total dividend pay out to net company income. ` +
            `It sums up how much money is being returned to shareholders in dividends. Rest of the income remains in the ` +
            `comapny and can be reinvested, be used to pay the debts etc. 0% is for companies that ` +
            `do not pay dividend and 100% is for companies that pays all income as dividends. This ratio is not a "game ` +
            `changer". It adds new value to analysis, can affect it, but definitely should not be decision-defining ratio. ` +
            `Shows how much net earnings are paid as dividends, while Dividend Yields Ratio is a simple rate of return in ` +
            `cash dividends to shareholders.`;
        this.extensiveDescription = `${this.ratioName} is affected by maturity of the company. Younger and smaller ` +
            `companies often pays smaller dividends (if any), and uses the money to develop quickier. On the other hand ` +
            `bigger and more mature companies often pays higher dividens (with reinvesting less of the income). Steady ` +
            `increased ratio across the years indicates healthy and mature business. However, if spikes appear on the ` +
            `chart, it is a sign to take a closer look on the company. Inductries are varying in terms of dividend, so ` +
            `they cannot be cross-compared. Different taxes, industry requirements or natures of businesses makes ` +
            `company comparision reliable only within industries. ${this.ratioName} is a key factor to determine the ` +
            `sustainability of a firm. This ratio should be rated on the basis of multiple years of dividend payments.`;
        this.formula = [this.ratioName, `Dividends Paid`, `Net Income`];
        this.example = `Let's assume that The Company 1 was steadily paying and increasing a dividend throughout the ` +
            `years. ${this.ratioName} is being higher and higher. That would probably mean the company is quite mature, ` +
            `sustainable and is doing quiet well. However, if in the history some spkies appears or the ${this.ratioName} ` +
            `is shrinking, it would be a red flag and need a closer look on the company.`;
        this.bulletPointSummary = [
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = DPRRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.undetermined,
                summary: `Company is not paying their earnings to shareholders and reinvests all in order to grow. It ` +
                    `may be good future of the company. However it strongly depends from management and industry itself.`,
                numberRating: 0
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Company is paying less than half of their earnings to shareholders and reinvests rest in order ` +
                    `to grow. It may be good future of the company. However it strongly depends from management and industry ` +
                    `itself.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Company is returning about half of earnings to shareholders and half is reinvested in order to ` +
                    `grow. This level of dividend allows to predict that company have sustainable dividend.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `That high dividend is usually unsustainable. Returning more money to shareholders than a company ` +
                    `earns indicates that dividend will be lowered or even stopped. It may lead to share price decreasing or ` +
                    `investors losing faith in company.`,
                numberRating: 2
            }, {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.error,
                summary: `Probably an error, 100% is maximum possible value.`,
                numberRating: 0
            }];
        this.intervals = [[-Infinity, 0], [0, 35], [35, 55], [55, 100], [100, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let annualDividendPerShare, earningsPerShare
    // here external def of above values for calculation
    // this.finalValue = annualDividendPerShare/earningsPerShare
    // }
}