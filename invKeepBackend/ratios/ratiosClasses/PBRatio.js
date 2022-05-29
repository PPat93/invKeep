const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');
const BasicRatio = require('./BasicRatio')

module.exports = class PBRatio extends BasicRatio {

    constructor(PBRatio) {
        super();
        this.ratioName = `P/B Ratio`;
        this.coAnalysis = [`NEVER ALONE!, ROE Ratio`];
        this.shortDescription = `The Price/Book Ratio allows to see how much it is needed to pay for one share of business
            in comparison to how much one share is worth. The higher value of this parameter is, the more overvalued a 
            company is. If ${this.ratioName} is equal to 1, then price of one share is exact the same as it is really worth. 
            However, low ratio may indicate that company performance is poor. Includes all liabilities and assets of the company.`;
        this.extensiveDescription = `Usually, ${this.ratioName} is above value of 1, that means the "real" value is lower
            than actual one. That situation is natural one, as majority of the investors tend to overprice assets on the markets.
            The "overprice", above one value, shows how much would you be loosing if company went immediately bankrupt. 
            ${this.ratioName} can be connected with ROE ratio, which can show reality check about the company. In case of
            big discrepancies between those, it is a big warning about the company. Growth, too expnsive businesses usually
            have a cobination of high ${this.ratioName} and low ROE ratio. Growing ROE should go along with growing 
            ${this.ratioName}. Even that some general values of "good" ${this.ratioName} exists, it shouldn't be rigid. 
            Industry influences the definition of "good" ratio. Good value for one branch, may be poor for another. Also,
            even the same barnch, but different countries may make huge difference in ${this.ratioName} value. Growth stocks
            often have higher ${this.ratioName} than the value ones.`;
        this.formula = [this.ratioName, `Market Price per Share`, `Book Value per Share`];
        this.example = `Let's assume that The Company 1 has $1 billion in assets and $500 million debt. It would be a Book 
            Value of $500 million. Assuming there us about $100 million shares on the matket, and each share costs $10, 
            then ${this.ratioName} value is (10 / 5) = 2. That means that with each bought share, investor is paying 
            twice the estimated amount that stock should cost.`;
        this.bulletPointSummary = [
            `Shows if company is over- or under-valued.`,
            `Low value may indicate company's poor performance.`,
            `The higher value the worse.`,
            `Does not show company's debt levels`,
            `Can be influenced by eg. buybacks, recent acquisitions etc.`,
            `Analyze with: ${this.coAnalysis}`
        ];
        this.finalValue = PBRatio;
        this.intervalsData = [
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Most likely company has debts, serious problems and not showing earnings. However, there is a 
                chance that it is made by e.g. a lot of buybacks. Definitely needs more analysis.`,
                numberRating: 2
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.outstanding,
                summary: `Stock is probably undervalued. May indicate a good opportunity.`,
                numberRating: 6
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.ok,
                summary: `Stock is probably still under or about fair value. Definately should be considered.`,
                numberRating: 4
            },
            {
                name: `${this.ratioName}`,
                verbalRating: SharedJS.RatingObject.rather_bad,
                summary: `Stock is overvalued. It is too expensive and it may not be profitable.`,
                numberRating: 2
            }];
        this.intervals = [[-Infinity, 0], [0, 1], [1, 3], [3, Infinity]];
    }

    // calculate(){ // future ratio more precise analysis method
    //  let marketPricePerShare, bookValuePerShare
    // here external def of above values for calculation
    // this.finalValue = marketPricePerShare/bookValuePerShare
    // }
}