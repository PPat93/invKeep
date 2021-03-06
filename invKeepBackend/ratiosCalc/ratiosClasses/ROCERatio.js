const BasicRatio = require('../BasicRatio');
const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class ROCERatio extends BasicRatio {

    constructor(ROCERatio) {
        super();
        this.ratioName = `ROCE Ratio`;
        this.coAnalysis = [`ROA, ROE, ROIC`];
        this.description = `Return On Capital Employed Ratio allows for analysis of company profitability on its capital.
         It is especially useful for performance comparison of firms in capital-sensitive branch sectors, e.g. telecoms 
         or utilities. Takes into account debt and equity. All in all it shows how many profit is generated per 1$. The 
         the higher the value, the better profitability of the company is. Usually investor prefers companies with stable
         ROCE instead of volatile one. Can be affected by high cash resources. May be presented in %`;
        this.additionalDetails = [
            `The higher, the better.`,
            `Allows comparison between capital-sensitive industry companies.`,
            `Better than ROE or ROA on longer period of time.`,
            `Can be affected by high money amounts.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.final_value = ROCERatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.terrible,
                summary: `Negative ROCE indicates negative profitability or net operational loss - no profits. Definitely
                 avoid.`,
                numberRating: 1
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Rather low levels of ROCE implies that there is low level of company performance. It depends 
                from industry. However it does not look good.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `It is hard to say which level of ROCE is good. It highly depends from industry and the company.
                The higher - the better.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_good,
                summary: `Legendary investor Warren Buffet said that ROCE above 20% is a good ROCE. The higher the better.
                In that way it also should be checked if company does not have too much cash and it s good to compare this
                ratio with other companies from an industry.`,
                numberRating: 5
            }];
        this.intervals = [[-Infinity, 0], [0, 10], [10, 20], [20, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let EBIT, capitalEmployed;
    // here external def of above values for calculation
    // this.final_value = EBIT/capitalEmployed;
    // }
}