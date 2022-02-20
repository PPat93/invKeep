import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnalyzedData, DetailedAssetRatios, DetailedAssetRatiosAnalyzed } from "../shared/sharedTS";
import { RatiosNames, RatiosUnits } from "../shared/sharedJS";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AssetRatiosService {

  private updateAssetRatios = new Subject<DetailedAssetRatiosAnalyzed>();
  ratiosReturn: {
    assetId: string,
    ratiosArray: { parameterName: any; valueNum: number; unit: string }[],
    analyzedData: AnalyzedData[]
  };

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string): Subject<DetailedAssetRatiosAnalyzed> {
    this.http.get<{ message: string, retrievedRatios: DetailedAssetRatios, analyzedData: AnalyzedData[] }>(`http://localhost:3000/api/detailed-ratios/${assetId}`)
      .pipe(map((returnedRatios) => {
        return {
          assetId: returnedRatios.retrievedRatios.assetId,
          ratiosArray: returnedRatios.retrievedRatios.ratiosArray.map((ratios) => {
            return [
              // TODO add dynamic for loop for each ratio instead of forced way
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[0].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[0].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[0].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[1].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[1].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[1].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[2].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[2].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[2].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[3].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[3].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[3].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[4].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[4].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[4].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[5].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[5].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[5].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[6].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[6].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[6].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[7].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[7].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[7].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[8].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[8].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[8].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[9].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[9].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[9].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[10].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[10].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[10].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[11].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[11].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[11].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[12].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[12].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[12].unit },
              { parameterName: returnedRatios.retrievedRatios.ratiosArray[13].parameterName, valueNum: returnedRatios.retrievedRatios.ratiosArray[13].valueNum, unit: returnedRatios.retrievedRatios.ratiosArray[13].unit }
            ]
          }),
          analyzedData: returnedRatios.analyzedData
        }
      }))
      .subscribe((returnedRatios) => {
        this.ratiosReturn = {
          assetId: assetId,
          ratiosArray: returnedRatios.ratiosArray[0],
          analyzedData: returnedRatios.analyzedData
        }
        this.updateAssetRatios.next(this.ratiosReturn);
      })
    return this.updateAssetRatios;
  }

  saveDetailedRatios(assetId: string, detailedRatios) {
    this.http.put<{ message: string, retrievedRatios: any }>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        // TODO add toastr after successfull/failed save
        // TODO detiled ratios automatic update after saving
      })
  }

  getRatiosUpdateListener(): Observable<DetailedAssetRatiosAnalyzed> {
    return this.updateAssetRatios.asObservable()
  }
}