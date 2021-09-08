const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class EVEBITDARatio extends BasicRatio {

    constructor(EVEBITDARatio) {
        super();
        this.ratioName = `EV/EBITDA Ratio`;
        this.coAnalysis = [`EV/EBIT Ratio`];
        this.description = ``;
        this.additionalDetails = [
            ``,
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