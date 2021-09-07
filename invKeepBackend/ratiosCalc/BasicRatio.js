const SharedJS = require('../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class BasicRatio {

    finalValue = 0;
    description = ``
    additionalDetails = [];
    coAnalysis = [];
    ratioName = ``;
    intervalsData = [{name: `${this.ratioName}`, verbalRating: ``, summary: ``, numberRating: 0}];
    intervals = [[-Infinity, 0], [0, Infinity]];

    constructor(ratio = 0, msg = ``) {
        this.finalValue = ratio;
        this.description = msg;
    }

    determineProfitability(ratioValue, intervals = this.intervals, intervalsData = this.intervalsData) {
        let wholeDataStruct = {intervals: intervals, data: intervalsData};
        for (let i = 0; i < wholeDataStruct.intervals.length; i++) {
            if (ratioValue > wholeDataStruct.intervals[i][0] && ratioValue <= wholeDataStruct.intervals[i][1]) {
                return wholeDataStruct.data[i]
            }
        }
    }
}