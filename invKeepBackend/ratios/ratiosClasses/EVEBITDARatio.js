const BasicRatio = require('./BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITDARatio extends BasicRatio {

    constructor(EVEBITDARatio) {
        super();
        this.ratioName = `EV/EBITDA Ratio`;
        this.coAnalysis = [`EV/EBIT Ratio`];
        this.shortDescription = `${this.ratioName} is also called Enterprise Multiple. Shows economic value of
            business. Might look similar to EV/EBIT. However, it also get rid of debt and amortization. Whole 
            enterprise value is compared with company's earnings with debt and amortization before taxes and 
            interests. Varies dependently from industry. Is higher for high-grown and probably overvalued 
            companies and lower for slow-growing, probably undervalued enterprises.`;
        this.extensiveDescription = `Ignores possible dissortions, because it does not take into account local
            tax policies. Can significantly vary dependently from the industry. Low ${this.ratioName} can be 
            deceiving and may be a "value trap" - some companies with low ${this.ratioName} are deserving such
            a low value. E.g. if company is struggling, and cannot really recover after crash it would have 
            low ${this.ratioName} and may look as a good investment. However, in that kind of situation it is 
            only illusion of an opportunity. It can be assesed on the basis of future values. If they are
            overly cheap, it may be a good predictor of a "value trap". ${this.ratioName} does not apply to 
            finance, insurance and real estate sector. For some industries this ratio can be misleading, 
            because it does not reflect the cost of capital investments like property, plants, and equipment.`;
        this.formula = [this.ratioName, 
                        `Market capitalization + Total Debt - Cash and cash equivalents`, 
                        `Net Income + Taxes + Interest Expense + Depreciation & Amortization`];
        this.example = `Let's assume that on the beginning of January, The Company 1 generated $4 billion 
            throught the last 12 months. The company had $4 million in cash and it's equivalents and $8 billion 
            of total debt. At the end of the next quarter, market cap of TC1 is $32 billion. So, ${this.ratioName} 
            is currently ($32 billion + $8 billion - $4 million)/$4 billion = 9,9. The same time, next year the
            The Company 1 has the same data, except the generated value - $3 billion instead $4 billion. Then 
            ${this.ratioName} is 13,3. Just one billion change altered ${this.ratioName} by 3,4. This example
            shows, how debt and equities are taken into account together and how relatively small change influences
            whole ratio`;
        this.bulletPointSummary = [
            `The lower the better, the higher the worse.`,
            `Varies dependently from industry and should be analyzed on industry average basis.`,
            `Shows how economical value of business corresponds wth estimatied value.`,
            `Is higher for fast growing industries and lower for slow growing ones.`,
            `Does not apply to some industries, e.g. finance, insurance and real estate `,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EVEBITDARatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.depends,
                summary: `Negative value indicates that either enterprise value or earnings before interests 
                    and taxes are negative. Treat with caution. Not necessarily bad, need further investigation.`,
                numberRating: 3
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `The lower ratio is, the better. Values below 10 are considered to be good.Indicates 
                    stable and secure company.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Value 14.20 was average for S&P500 on January 2020. Values between 10 and 18 are about 
                    average and they may be worth attention of investors.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Too high value indicates unstable and unsecure company. Probably not worth of wasting time.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 18], [18, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let enterpiseValue, ebitda;
    // here external def of above values for calculation
    // this.finalValue = enterpiseValue/ebitda;
    // }
}