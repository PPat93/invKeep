import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnalyzedData, AssetRatiosValues, AssetAndIndicatorsAnlysis } from "../shared/sharedTS";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AssetRatiosService {

  private updateAssetRatios = new Subject<AssetAndIndicatorsAnlysis>();
  private ratiosAnalysisEdit = new Subject<AnalyzedData[]>();
  ratiosReturn2: {
    assetId: string,
    ratiosArray: { parameterName: any; valueNum: number; unit: string }[],
    analyzedData: AnalyzedData[]
  };
  ratiosReturn: {
    assetId: string,
    ratiosArray: { parameterName: any; valueNum: number; unit: string }[],
    analyzedData: AnalyzedData[]
  };

  constructor(private http: HttpClient) {
  }

  getAssetRatiosValues(assetId: string) {
    this.http.get<{ message: string, retrievedRatios: AssetRatiosValues, analyzedData: AnalyzedData[] }>(`http://localhost:3000/api/ratio-analysis/${assetId}`)
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

  saveRatiosValues(assetId: string, ratiosValues) {
    this.http.put<{ message: string, analyzedData: any }>(`http://localhost:3000/api/ratio-analysis/${assetId}`, ratiosValues)
      .subscribe(responseData => {
        this.ratiosAnalysisEdit.next(responseData.analyzedData);
      })
    return this.ratiosAnalysisEdit;
  }

  getRatiosUpdateListener(): Observable<AssetAndIndicatorsAnlysis> {
    return this.updateAssetRatios.asObservable()
  }

  getRatiosAnalysisListener(): Observable<AnalyzedData[]> {
    return this.ratiosAnalysisEdit.asObservable()
  }
}