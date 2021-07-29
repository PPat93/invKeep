const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PSRatio extends BasicRatio {

    constructor(PSRatio) {
        super();
        this.ratioName = `P/S Ratio`;
        this.coAnalysis = [`D/E Ratio, EPS Ratio, P/B Ratio, P/E Ratio`];
        this.description = `Price-to-Sales Ratio compares company stock price with revenues. It illustrate how much 
        investors are willing to pay for one dollar of company sales. Ratio below one indicates that company generates 
        more money than it costs. On the other hand, if ratio is greater than 1, it shows that stock is probably overvalued. 
        This factor takes into account only price and revenue. ALl other data is omitted, what can cause some serious mistakes. 
        It is worth to compare company with other ones from an industry.`;
        this.additionalDetails = [
            `The lower, the better.`,
            `Works great in comparison with other industry companies.`,
            `Does not take into account debt, earnings etc.`,
            `One value shows that for every dollar investor must pay one dollar.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = PSRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Negative ROE is probably a consequence of loosing money by company. However some actions - like 
                restructuring - may make ROE negative despite business is profitable. (Long term average ${this.ratioName} for S&P500 
                is 14%).`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Ratio significantly below industry average indicates that company is not doing good. Better not 
                to buy. (Long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value just about industry average is considered as ok. Ratio above average indicates good stock.
                (Long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Be cautious. It may be great opportunity as the higher ${this.ratioName} the better. However, inconsistent 
                profits influence the ratio (Long term average ${this.ratioName} for S&P500 is 14%).`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 12], [12, 16], [16, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let pricePerShare, revenuePerShare
    // here external def of above values for calculation
    // this.final_value = pricePerShare/revenuePerShare
    // }
}