import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DetailedAssetRatios} from "../../shared/shared";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class AssetRatiosService {

  assetRatios: DetailedAssetRatios;

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string): DetailedAssetRatios {
    this.http.get<{ message: string, payload: DetailedAssetRatios }>(`http://localhost:3000/api/detailed-ratios/${assetId}`)
      .pipe(map((data) => {
          this.assetRatios = data.payload;
        })
      ).subscribe()
    console.log(this.assetRatios);
    return this.assetRatios;
  }

  saveDetailedRatios(assetId: string, detailedRatios) {
    this.http.put<{ message: string, payload: any }>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        //placeholder for later toastr

      })
  }
}
