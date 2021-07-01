import {RatiosNames, searchObject} from "../../invKeepFrontend/src/app/shared/sharedJS";

export class AllRatios {

    constructor(detailedRatiosArray) {
         var objEPSratio = new EPSRatio((searchObject(detailedRatiosArray, RatiosNames.eps_ratio)).valueNum);
    }



}