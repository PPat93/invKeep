const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class ROERatio extends BasicRatio {

    constructor(ROERatio) {
        super();
        this.ratioName = `ROE Ratio`;
        this.coAnalysis = [`P/B Ratio`];
        this.shortDescription = `Return on Equity ratio allows to calculate company financial performance. Basically, the 
            higher, the better - above industry average is considered as good. As it takes debt into account, it is 
            dependant on what is average for company's industry. Usually counted on last financial year. However, it is 
            important to check base period. It may be influenced by inconsistent profits e.g.: if company is unprofitable 
            for several years and suddenly gains profits - ${this.ratioName} will skyrocket. Represented in %.`;
        this.extensiveDescription = `${this.ratioName} is a better, more comprehensive alternative for ROCE ratio. This
            ratio varies greatly depending in which industry is counted. Those can vary by even 30% og the value between
            different branches. Usually, value equal or maybe a slightly above the average of the sector is a proper 
            value. ${this.ratioName} is a great start for estimation of future growth of stock and dividends. Really high 
            value may be a result of a small equity in reference to a perfomance of the company, which may indicate a
            high risk. Alos, if profits are inconsistent e.g. company was loosing money for a several years shrinking
            firm's equity and suddenly it has some bigger earnings one year ${this.ratioName} would be deceitfully high.
            The same can happen if company borrow a lot of money to buyback a stock - high EPS without real performance
            or growth. Those are not only examples of this kinf od situation, so investors must be cautious with ${this.ratioName}.
            Negative and positive values of this ratio cannot be compared, as the causes of value are completely different.`;
        this.formula = [this.ratioName, `Net Income`, `Average Shareholders' Equity`];
        this.example = `Let's assume that The Company 1 has a Net Income equalto 5 000 000$ and average equity of 50 000 000$
            in that case ${this.ratioName} value would be 10%. If that value is good depends on the industry. If average
            ${this.ratioName} would be 7%, then this value is pretty decent. If average value is 15% - it would be a poor
            value.`;
        this.bulletPointSummary = [
            `The higher, the better - above industry average is considered as good.`,
            `Allows to calculate company financial performance.`,
            `Highly dependant on industry average.`,
            `May be influenced by inconsistent profits.`,
            `Represented in %.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = ROERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Negative ROE is probably a consequence of loosing money by company. However some actions - like 
                restructuring - may make ROE negative despite business is profitable (long term average ${this.ratioName} for S&P500 
                is 14%).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Ratio significantly below industry average indicates that company is not doing good. Better do 
                close investigation before buying (long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value just about industry average is considered as ok. Ratio above average probably indicates a good stock
                (long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Be cautious. It may be great opportunity as the higher ${this.ratioName} the better. However, inconsistent 
                profits influence the ratio (long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 12], [12, 16], [16, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.finalValue = oneSharePrice/earningsPerShare
    // }
}