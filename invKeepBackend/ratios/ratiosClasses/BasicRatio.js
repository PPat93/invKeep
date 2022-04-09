const SharedJS = require('../../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class BasicRatio {

    ratioName = ``;
    coAnalysis = [];
    shortDescription = ``;
    extensiveDescription = ``;
    formula = ``;
    example = ``;
    bulletPointSummary = [];
    finalValue = 0;
    intervalsData = [{ name: `${this.ratioName}`, verbalRating: ``, summary: ``, numberRating: 0 }];
    intervals = [[-Infinity, 0], [0, Infinity]];

    constructor(ratio = 0, msg = ``) {
        this.finalValue = ratio;
        this.shortDescription = msg;
    }

    determineProfitability(intervals = this.intervals, intervalsData = this.intervalsData) {
        let wholeDataStruct = { intervals: intervals, data: intervalsData };
        for (let i = 0; i < wholeDataStruct.intervals.length; i++) {
            if (this.finalValue > wholeDataStruct.intervals[i][0] && this.finalValue <= wholeDataStruct.intervals[i][1]) {
                return wholeDataStruct.data[i]
            }
        }
    }

    returnAllAnalyzedData() {

        return {
            name: this.ratioName,
            value: this.finalValue,
            shortDescription: this.shortDescription,
            bulletPointSummary: this.bulletPointSummary,
            coanalysis: this.coAnalysis,
            intervals: this.determineProfitability(),
        }
    }

    returnaAllRatioInfos() {
        let allInfoObject = {
            name: this.ratioName,
            shortDescription: this.shortDescription,
            coanalysis: this.coAnalysis,
            bulletPointSummary: this.bulletPointSummary,
            intervals: {
                data: this.intervalsData,
                values: this.intervals
            },
            extensiveDescription: this.extensiveDescription
        };
        return allInfoObject;
    }
}