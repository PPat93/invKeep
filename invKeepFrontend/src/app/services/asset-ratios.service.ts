import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AnalyzedData, AssetRatiosValues, AssetAndIndicatorsAnlysis } from "../shared/sharedTS";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AssetRatiosService {

  private updateAssetRatios = new Subject<AssetAndIndicatorsAnlysis>();
  private ratiosAnalysisEdit = new Subject<AnalyzedData[]>();

  ratiosReturn: {
    assetId: string,
    ratiosArray: { parameterName: string; valueNum: number; unit: string }[],
    analyzedData: AnalyzedData[]
  };

  constructor(private http: HttpClient) {
  }

  processedRatios: { parameterName: string, valueNum: number, unit: string }[] = [];

  getAssetRatiosValues(assetId: string) {
    this.http.get<{ message: string, retrievedRatios: AssetRatiosValues, analyzedData: AnalyzedData[] }>(`http://localhost:3000/api/ratio-analysis/${assetId}`)
      .pipe(map((returnedRatios) => {
        // Reprocessing returned ratios, so it has a proper structure needed by frontend. 
        return {
          assetId: returnedRatios.retrievedRatios.assetId,
          ratiosArray: returnedRatios.retrievedRatios.ratiosArray.map(ratio => {
            this.processedRatios.push({ parameterName: ratio.parameterName, valueNum: ratio.valueNum, unit: ratio.unit })
            return this.processedRatios
          }),
          analyzedData: returnedRatios.analyzedData
          //  TODO - 1 - not urgent -> Somewhere units disappeared and in database there were ot existing anymore. Have no idea where it happened, it might be somewhere
          //  during app development or during migration from windows. Nevertheless, to be checked and be sure that they won't be lost anymore
          //  Maybe addition of some validation before request send or automatic addition of units 
        }
      }))
      .subscribe((returnedRatios) => {
        //  processedRatios variable cleaning after processing retrieved ratios array, so after next record 'visiting' previous data
        //  won't be dslayed and new array will be created on fresh variable
        this.processedRatios = []
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

  saveAnalysisImageHttp(imageFile: File, assetId: string){
    // this.http.post
  }

  getRatiosUpdateListener(): Observable<AssetAndIndicatorsAnlysis> {
    return this.updateAssetRatios.asObservable()
  }

  getRatiosAnalysisListener(): Observable<AnalyzedData[]> {
    return this.ratiosAnalysisEdit.asObservable()
  }
}