import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {stringify} from "@angular/compiler/src/util";

@Injectable({providedIn: 'root'})

export class AssetRatiosService {

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId: string) {
    // this.http.get<{message: string, payload: AssetRatiosService}>('http://localhost:3000/api/detailed-ratios/:id', assetId)
    //   .subscribe((responseData) => {
    //   responseData.payload
    // })
  }

  saveDetailedRatios(assetId: string, detailedRatios) {
    console.log(detailedRatios)
    this.http.put<{message: string, payload: any}>(`http://localhost:3000/api/detailed-ratios/${assetId}`, detailedRatios)
      .subscribe(responseData => {
        //placeholder for later toastr

      })
  }
}
