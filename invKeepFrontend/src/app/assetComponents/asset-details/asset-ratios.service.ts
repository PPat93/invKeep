import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AssetRecord, DetailedAssetRatios} from "../../shared/shared";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})

export class AssetRatiosService {

  private assetRatios = new Subject<DetailedAssetRatios>();
  ratiosReturn;

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string): {parameterName: string, valueNum: number}[]{
    this.http.get<{ message: string, payload: DetailedAssetRatios }>(`http://localhost:3000/api/detailed-ratios/${assetId}`)
      .pipe(map((returnedRatios) => {
        return returnedRatios.payload.ratiosArray.map((ratios) => {
          return [
              {parameterName: `EPSRatio`, valueNum: returnedRatios.payload.ratiosArray[0].valueNum},
              {parameterName: `PERatio`, valueNum: returnedRatios.payload.ratiosArray[1].valueNum},
              {parameterName: `PEGRatio`, valueNum: returnedRatios.payload.ratiosArray[2].valueNum},
              {parameterName: `CAPERatio`, valueNum: returnedRatios.payload.ratiosArray[3].valueNum},
              {parameterName: `PBRatio`, valueNum: returnedRatios.payload.ratiosArray[4].valueNum},
              {parameterName: `DERatio`, valueNum: returnedRatios.payload.ratiosArray[5].valueNum},
              {parameterName: `ROE`, valueNum: returnedRatios.payload.ratiosArray[6].valueNum},
              {parameterName: `ROCERatio`, valueNum: returnedRatios.payload.ratiosArray[7].valueNum},
              {parameterName: `DividendYield`, valueNum: returnedRatios.payload.ratiosArray[8].valueNum},
              {parameterName: `DPRRatio`, valueNum: returnedRatios.payload.ratiosArray[9].valueNum},
              {parameterName: `PSRatio`, valueNum: returnedRatios.payload.ratiosArray[10].valueNum},
              {parameterName: `GrahamNum`, valueNum: returnedRatios.payload.ratiosArray[11].valueNum},
              {parameterName: `EVtoEBITRatio`, valueNum: returnedRatios.payload.ratiosArray[12].valueNum},
              {parameterName: `EVtoEBITDA`, valueNum: returnedRatios.payload.ratiosArray[13].valueNum}
            ]
        });
      }))
      .subscribe((returnedRatios) => {
        this.ratiosReturn = returnedRatios[0]
        return returnedRatios[0];
      })
    return this.ratiosReturn;
  }

  saveDetailedRatios(assetId: string, detailedRatios) {
    this.http.put<{ message: string, payload: any }>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        //placeholder for later toastr
      })
  }
}
