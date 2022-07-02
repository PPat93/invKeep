const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class PSRatio extends BasicRatio {

    constructor(PSRatio) {
        super();
        this.ratioName = `P/S Ratio`;
        this.coAnalysis = [`D/E Ratio, EPS Ratio, P/B Ratio, P/E Ratio`];
        this.shortDescription = `Price-to-Sales Ratio compares company stock price with revenues. It illustrate how much ` +
            `investors are willing to pay for one dollar of company sales. Ratio below one indicates that company generates ` +
            `more money than it costs. On the other hand, if ratio is greater than 1, it shows that stock is probably overvalued. ` +
            `This factor takes into account only price and revenue. All other data is omitted, what can cause some serious ` +
            `mistakes. It is worth to compare company with other ones from an industry.`;
        this.extensiveDescription = `${this.ratioName} may be calculated on the basis of a single share or on ` +
            `the company's market capitalization. As usually, this ratio can be compared within the industry of a company ` +
            `involved. ${this.ratioName} is omitting a lot of other factors. The ratio does not show if a company has or ` +
            `will have any earnings. This kind of formula makes it completely dependent from a lot of other ratios during ` +
            `an analysis.`;
        this.formula = [this.ratioName, `Market Value per Share`, `Sales per Share`];
        this.example = `Let's assume that The Company 1 has sales per share equal to $10 - on the basis of the last year. ` +
            `So, in case of the price of $5 per share, ${this.ratioName} (Trailing) would be 0.5. It would mean that the ` +
            `company is probably undervalued. To better asses TC1, ${this.ratioName} for current fiscal year can be calculated ` +
            `and combined with Trailing one so some change would be visible. So let's also assume, that TC1 has current ` +
            `fiscal year sales per share $20. So ${this.ratioName} (FY) would be 0.25. This values are showing that TC1 ` +
            `is being more undervalued lately. It is important to find the reasons. It may be just the fact that investors ` +
            `are missing the oportunity, and in the near future the price will probably go up. However, this kind of ` +
            `conclusion may be done only with assistance of other ratios.`;
        this.bulletPointSummary = [
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
                summary: `Negative value indicates that revenue of the company is also negative (rather unlikely case). However, ` +
                    `in this kind of situation - avoid at all cost!`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Value below 1 and higher than 0 shows that stock is undervalued. After positive industry ` +
                    `comparison and analysis - totally worth buying.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Ratio between 1 and 2 is a solid, considerable value. Thi kind of stocks may have ` +
                    `potential for further growth. After comparison it is worth to consider buying.`,
                numberRating: 5
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Values from 2 to 4 are usually thought as ok, especially if company is relatively young with ` +
                    `a lot of growth potential. It may also indicate company that is not necessarily promise well. Requires ` +
                    `analysis and comparison.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Stock is most likely overvalued. Over 0.25$ of revenue per 1$ price does not indicate ` +
                    `a good opportunity. Definitely avoid.`,
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