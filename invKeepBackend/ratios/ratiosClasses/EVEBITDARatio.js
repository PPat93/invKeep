const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITDARatio extends BasicRatio {

    constructor(EVEBITDARatio) {
        super();
        this.ratioName = `EV/EBITDA Ratio`;
        this.coAnalysis = [`EV/EBIT Ratio`];
        this.shortDescription = `Other name is Enterprise multiple. Shows economic value of business. Might look
            similar to EV/EBIT, however it also get rid of debt and amortization. Whole enterprise value 
            is compared  with company's earnings with debt and amortization before taxes and interests. Varies 
            dependently from industry. Is higher for high-grown and probably overvalued companies and lower for 
            slow-growing, probably undervalued enterprises.`;
        this.extensiveDescription = ``;
        this.formula = ``;
        this.bulletPointSummary = [
            `The lower the better, the higher the worse.`,
            `Varies dependently from industry and should be analyzed on industry average basis.`,
            `Shows how economical value of business corresponds wth estimatied value.`,
            `Is higher for fast growing industries and lower for slow growing ones.`,
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