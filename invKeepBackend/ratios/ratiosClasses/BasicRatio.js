const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class BasicRatio {

    ratioName = `Default Name`;
    coAnalysis = [`First default coAnalysis ratio name`, `Second default coAnalysis ratio name`];
    shortDescription = `Default short ratio description about the ratio`;
    extensiveDescription = `Default long, extensive ratio description that is going on and on and on. Details and more...`;
    formula = `(default formula value) = a + b/2`;
    example = `If ratio is being bigger and bigger while something, then something and it is defaultly worth/not worth to buy`;
    bulletPointSummary = [
        `First default ratio summary point`,
        `Second default ratio summary point`,
        `Third default ratio summary point`
        ];
    finalValue = 0;
    intervalsData = [{ name: `${this.ratioName}`, verbalRating: SharedJS.RatingObject.neutral, summary: `Default analysis ratio short comment`, numberRating: 0 }];
    intervals = [[-Infinity, 0], [0, Infinity]];

    constructor(ratio = 0) {
        this.finalValue = ratio;
    }

    determineProfitability(intervals = this.intervals, intervalsData = this.intervalsData) {
        let wholeDataStruct = { intervals: intervals, data: intervalsData };
        for (let i = 0; i < wholeDataStruct.intervals.length; i++) {
            if (this.finalValue > wholeDataStruct.intervals[i][0] && this.finalValue <= wholeDataStruct.intervals[i][1]) {
                return wholeDataStruct.data[i];
            }
        }
    }

    returnAllAnalyzedData() {

        return {
            name: this.ratioName,
            value: this.finalValue,
            shortDescription: this.shortDescription,
            bulletPointSummary: this.bulletPointSummary,
            coAnalysis: this.coAnalysis,
            intervals: this.determineProfitability(),
        }
    }

    returnaAllRatioInfos() {
        let allInfoObject = {
            name: this.ratioName,
            shortDescription: this.shortDescription,
            extensiveDescription: this.extensiveDescription,
            formula: this.formula,
            example: this.example,
            coAnalysis: this.coAnalysis,
            bulletPointSummary: this.bulletPointSummary,
            intervals: {
                data: this.intervalsData,
                values: this.intervals
            },
        };
        return allInfoObject;
    }
}