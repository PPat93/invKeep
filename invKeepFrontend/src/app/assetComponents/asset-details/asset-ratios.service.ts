import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DetailedAssetRatios } from "../../shared/sharedTS";
import { RatiosNames } from "../../shared/sharedJS";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AssetRatiosService {

  private updateAssetRatios = new Subject<DetailedAssetRatios>();
  ratiosReturn: DetailedAssetRatios;

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string): DetailedAssetRatios {
    this.http.get<{ message: string, retrievedRatios: DetailedAssetRatios }>(`http://localhost:3000/api/detailed-ratios/${assetId}`)
      .pipe(map((returnedRatios) => {
        return returnedRatios.retrievedRatios.ratiosArray.map((ratios) => {
          return [
            { parameterName: RatiosNames.eps_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[0].valueNum },
            { parameterName: RatiosNames.pe_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[1].valueNum },
            { parameterName: RatiosNames.peg_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[2].valueNum },
            { parameterName: RatiosNames.cape_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[3].valueNum },
            { parameterName: RatiosNames.pb_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[4].valueNum },
            { parameterName: RatiosNames.de_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[5].valueNum },
            { parameterName: RatiosNames.roe_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[6].valueNum },
            { parameterName: RatiosNames.roce_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[7].valueNum },
            { parameterName: RatiosNames.dividend_yield, valueNum: returnedRatios.retrievedRatios.ratiosArray[8].valueNum },
            { parameterName: RatiosNames.dpr_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[9].valueNum },
            { parameterName: RatiosNames.ps_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[10].valueNum },
            { parameterName: RatiosNames.graham_num, valueNum: returnedRatios.retrievedRatios.ratiosArray[11].valueNum },
            { parameterName: RatiosNames.ev_ebit_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[12].valueNum },
            { parameterName: RatiosNames.ev_ebitda_ratio, valueNum: returnedRatios.retrievedRatios.ratiosArray[13].valueNum }
          ]
        });
      }))
      .subscribe((returnedRatios) => {
        this.ratiosReturn = {
          assetId: assetId,
          ratiosArray: returnedRatios[0]
        }
        this.updateAssetRatios.next(this.ratiosReturn);
      })
    return this.ratiosReturn;
  }

  saveDetailedRatios(assetId: string, detailedRatios) {
    this.http.put<{ message: string, retrievedRatios: any }>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        //placeholder for later toastr
      })
  }

  getRatiosUpdateListener(): Observable<DetailedAssetRatios> {
    return this.updateAssetRatios.asObservable()
  }
}
