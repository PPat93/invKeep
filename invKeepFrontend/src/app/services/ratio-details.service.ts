import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AnalyzedData } from "../shared/sharedTS";

@Injectable({ providedIn: 'root' })

export class RatioDetailsService {

    private detailedRatiosInfos = new Subject<AnalyzedData[]>();

    constructor(private http: HttpClient) { }

    getRatiosDetails(assetId: string) {
        this.http.get<{ message: string, detailedInfos: any }>(`http://localhost:3000/api/ratio-analysis/${assetId}/details`)
            .subscribe(responseData => {
                this.detailedRatiosInfos.next(responseData.detailedInfos);
            })
        return this.detailedRatiosInfos;
    }
}