module.exports = class BasicRatio {

    final_value = 0;
    description = ``
    additionalDetails = [];
    analysisSummary = [``];
    coAnalysis = [];
    ratioName = ``;
    onScaleRating = 0;

    constructor(ratio = 0, msg = ``) {
        this.final_value = ratio;
        this.description = msg;
    }

    determineProfitability(ratioValue) {
        switch(true){
            case (0 <= ratioValue):
                this.analysisSummary = [`${this.ratioName}`, `Undetermined`, `Value added on default ratio class, use 
                specified ratio class or add new one.`, this.onScaleRating];
                break;
            default:
                this.analysisSummary = [`${this.ratioName}`, `Undetermined`, `Value added on default ratio class, use 
                specified ratio class or add new one.`, this.onScaleRating];
        }
        return this.analysisSummary;
    }



}