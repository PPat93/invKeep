import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AssetRecord, DetailedAssetRatios} from "../../shared/shared";
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
            {parameterName: `EPS Ratio`, valueNum: returnedRatios.payload.ratiosArray[0].valueNum},
            {parameterName: `P/E Ratio`, valueNum: returnedRatios.payload.ratiosArray[1].valueNum},
            {parameterName: `PEG Ratio`, valueNum: returnedRatios.payload.ratiosArray[2].valueNum},
            {parameterName: `CAPE Ratio`, valueNum: returnedRatios.payload.ratiosArray[3].valueNum},
            {parameterName: `P/B Ratio`, valueNum: returnedRatios.payload.ratiosArray[4].valueNum},
            {parameterName: `D/E Ratio`, valueNum: returnedRatios.payload.ratiosArray[5].valueNum},
            {parameterName: `ROE`, valueNum: returnedRatios.payload.ratiosArray[6].valueNum},
            {parameterName: `ROCE Ratio`, valueNum: returnedRatios.payload.ratiosArray[7].valueNum},
            {parameterName: `Dividend Yield`, valueNum: returnedRatios.payload.ratiosArray[8].valueNum},
            {parameterName: `DPR Ratio`, valueNum: returnedRatios.payload.ratiosArray[9].valueNum},
            {parameterName: `P/S Ratio`, valueNum: returnedRatios.payload.ratiosArray[10].valueNum},
            {parameterName: `Graham Number`, valueNum: returnedRatios.payload.ratiosArray[11].valueNum},
            {parameterName: `EV/EBIT Ratio`, valueNum: returnedRatios.payload.ratiosArray[12].valueNum},
            {parameterName: `EV/EBITDA Ratio`, valueNum: returnedRatios.payload.ratiosArray[13].valueNum}
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
