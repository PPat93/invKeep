import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AssetRecord, DetailedAssetRatios, RatiosNames} from "../../shared/shared";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})

export class AssetRatiosService {

  private updateAssetRatios = new Subject<DetailedAssetRatios>();
  ratiosReturn;

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string): { parameterName: string, valueNum: number }[] {
    this.http.get<{ message: string, payload: DetailedAssetRatios }>(`http://localhost:3000/api/detailed-ratios/${assetId}`)
      .pipe(map((returnedRatios) => {
        return returnedRatios.payload.ratiosArray.map((ratios) => {
          return [
            {parameterName: RatiosNames.eps_ratio, valueNum: returnedRatios.payload.ratiosArray[0].valueNum},
            {parameterName: RatiosNames.pe_ratio, valueNum: returnedRatios.payload.ratiosArray[1].valueNum},
            {parameterName: RatiosNames.peg_ratio, valueNum: returnedRatios.payload.ratiosArray[2].valueNum},
            {parameterName: RatiosNames.cape_ratio, valueNum: returnedRatios.payload.ratiosArray[3].valueNum},
            {parameterName: RatiosNames.pb_ratio, valueNum: returnedRatios.payload.ratiosArray[4].valueNum},
            {parameterName: RatiosNames.de_ratio, valueNum: returnedRatios.payload.ratiosArray[5].valueNum},
            {parameterName: RatiosNames.roe_ratio, valueNum: returnedRatios.payload.ratiosArray[6].valueNum},
            {parameterName: RatiosNames.roce_ratio, valueNum: returnedRatios.payload.ratiosArray[7].valueNum},
            {parameterName: RatiosNames.dividend_yield, valueNum: returnedRatios.payload.ratiosArray[8].valueNum},
            {parameterName: RatiosNames.dpr_ratio, valueNum: returnedRatios.payload.ratiosArray[9].valueNum},
            {parameterName: RatiosNames.ps_ratio, valueNum: returnedRatios.payload.ratiosArray[10].valueNum},
            {parameterName: RatiosNames.graham_num, valueNum: returnedRatios.payload.ratiosArray[11].valueNum},
            {parameterName: RatiosNames.ev_ebit_ratio, valueNum: returnedRatios.payload.ratiosArray[12].valueNum},
            {parameterName: RatiosNames.ev_ebitda_ratio, valueNum: returnedRatios.payload.ratiosArray[13].valueNum}
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
    this.http.put<{ message: string, payload: any }>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        //placeholder for later toastr
      })
  }

  getRatiosUpdateListener() {
    return this.updateAssetRatios.asObservable()
  }
}
