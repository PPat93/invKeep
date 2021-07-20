const SharedJS = require('../../invKeepFrontend/src/app/shared/sharedJS');

module.exports = class BasicRatio {

    final_value = 0;
    description = ``
    additionalDetails = [];
    analysisSummary = [``];
    coAnalysis = [];
    ratioName = ``;
    intervalsData = [{name: `${this.ratioName}`, verbalRating: ``, summary: ``, numberRating: 0}];
    intervals = [[-Infinity, 0], [0, Infinity]];

    constructor(ratio = 0, msg = ``) {
        this.final_value = ratio;
        this.description = msg;
    }

    determineProfitability(ratioValue, intervals = this.intervals, intervalsData = this.intervalsData) {
        let wholeDataStruct = {intervals: intervals, data: intervalsData};
        for (let i = 0; i < wholeDataStruct.intervals.length; i++) {
            if (ratioValue > wholeDataStruct.intervals[i][0] && ratioValue <= wholeDataStruct.intervals[i][1]) {
                return wholeDataStruct.data[i]
            }
        }
        // switch (true) {
        //     case (0 <= ratioValue):
        //         this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.undetermined, `Value added on default ratio class, use
        //         specified ratio class or add new one.`, this.onScaleRating];
        //         break;
        //     default:
        //         this.analysisSummary = [`${this.ratioName}`, SharedJS.RatingObject.undetermined, `Value added on default ratio class, use
        //         specified ratio class or add new one.`, this.onScaleRating];
        // }
        // return this.analysisSummary;
    }


}