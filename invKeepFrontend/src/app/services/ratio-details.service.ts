import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { RatioInfoObject } from "../shared/sharedTS";

@Injectable({ providedIn: 'root' })

export class RatioDetailsService {

    private detailedRatiosInfos = new Subject<RatioInfoObject>();

    constructor(private http: HttpClient) { }

    getRatiosDetails(ratioName: string) {
        let prepareUrlParam = ratioName.replace(`/`, ``).replace(/\s+/g, '').toLowerCase();
        this.http.get<{ message: string, detailedInfos: any }>(`http://localhost:3000/api/ratio-details/${prepareUrlParam}`)
            .subscribe(responseData => {
                this.detailedRatiosInfos.next(responseData.detailedInfos);
            })
        return this.detailedRatiosInfos;
    }

    getRatiosDetailsListener(): Observable<RatioInfoObject>{
        return this.detailedRatiosInfos.asObservable()
    }
}