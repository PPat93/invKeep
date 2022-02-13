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
        this.finalValue = PSRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative value indicates that revenue of the company is also negative (rather unlikely case). However, 
                in this kind of situation - avoid at all cost!`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Value below 1 and higher than 0 shows that stock is undervalued. After positive industry 
                comparison and analysis - totally worth buying.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Ratio between 1 and 2 is a solid, considerable value. Thi kind of stocks may have 
                potential for further growth. After comparison it is worth to consider buying.`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Values from 2 to 4 are usually thought as ok, especially if company is relatively young with
                a lot of growth potential. It may also indicate company that is not necessarily promise well. Requires 
                analysis and comparison.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Stock is most likely overvalued. Over 0.25$ of revenue per 1$ price does not indicate 
                a good opportunity. Definitely avoid.`,
                numberRating: 2
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, 2], [2, 4], [4, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let pricePerShare, revenuePerShare
    // here external def of above values for calculation
    // this.finalValue = pricePerShare/revenuePerShare
    // }
}