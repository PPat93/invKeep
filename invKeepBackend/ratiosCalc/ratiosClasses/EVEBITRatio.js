const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITRatio extends BasicRatio {

    constructor(EVEBITRatio) {
        super();
        this.ratioName = `EV/EBIT Ratio`;
        this.coAnalysis = [`EV/EBITDA Ratio`];
        this.description = `It is more powerfull P/E Ratio. Whole enterprise value is compared with company's earnings
            before taxes and interests. The bigger earnings the better - whole ratio would be lower. Low ${this.ratioName}
            indicates stable and secure company. Allows easy comparison of two firms with similar operating profiles. 
            The difference between EV/EBITDA is ${this.ratioName} do not incorporaates depreciation and amortization.`;
        this.additionalDetails = [
            `Should be compared with industry average.`,
            `May by totally different across industries.`,
            `The lower the better.`,
            `Allows to estimate fair company value, ratio below average indicates undervalued stock.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = EVEBITRatio;
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
                summary: `Too big value indicates unstable and unsecure company. Not worth of wasting time.`,
                numberRating: 1
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 18], [18, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let enterpiseValue, ebit;
    // here external def of above values for calculation
    // this.finalValue = enterpiseValue/ebit;
    // }
}