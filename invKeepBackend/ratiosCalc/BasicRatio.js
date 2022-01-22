const SharedJS = require('../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class BasicRatio {

    finalValue = 0;
    description = ``
    additionalDetails = [];
    coAnalysis = [];
    ratioName = ``;
    intervalsData = [{ name: `${this.ratioName}`, verbalRating: ``, summary: ``, numberRating: 0 }];
    intervals = [[-Infinity, 0], [0, Infinity]];

    constructor(ratio = 0, msg = ``) {
        this.finalValue = ratio;
        this.description = msg;
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
            description: this.description,
            shortly: this.additionalDetails,
            coanalysis: this.coAnalysis,
            intervals: this.determineProfitability(),
        }
    }
}