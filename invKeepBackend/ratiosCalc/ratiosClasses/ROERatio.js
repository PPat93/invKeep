const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class ROERatio extends BasicRatio {

    constructor(ROERatio) {
        super();
        this.ratioName = `ROE Ratio`;
        this.coAnalysis = [`P/B Ratio`];
        this.description = `Return on Equity ratio allows to calculate company financial performance. Basically, the 
        higher, the better - above industry average is considered as good. As it takes debt  into account, it is 
        dependant on what is average for company's industry. Usually counted on last financial year, however it is 
        important to check base period. It may be influenced by inconsistent profits e.g.: if company is unprofitable 
        for several years and suddenly gains profits -ROE Ratio will skyrocket. Represented in %.`;
        this.additionalDetails = [
            `The higher, the better - above industry average is considered as good.`,
            `Allows to calculate company financial performance.`,
            `Highly dependant on industry average.`,
            `May be influenced by inconsistent profits.`,
            `Represented in %.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = ROERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Negative ROE is probably a consequence of loosing money by company. However some actions - like 
                restructuring - may make ROE negative despite business is profitable. (Long term average ROE for S&P500 
                is 14%).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Ratio significantly below industry average indicates that company is not doing good. Better not 
                to buy. (Long term average ROE for S&P500 is 14%).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value just about industry average is considered as ok. Ratio above average indicates good stock.
                (Long term average ROE for S&P500 is 14%).`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Be cautious. It may be great opportunity as the higher ROE the better. However, inconsistent 
                profits influence the ratio (Long term average ROE for S&P500 is 14%).`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 12], [12, 16], [16, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let oneSharePrice, earningsPerShare
    // here external def of above values for calculation
    // this.final_value = oneSharePrice/earningsPerShare
    // }
}