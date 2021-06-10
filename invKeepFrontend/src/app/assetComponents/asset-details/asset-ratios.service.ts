import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class AssetRatiosService {

  constructor(private http: HttpClient) {
  }

  getDetailedRatios(assetId){
    this.http.get<{message: string, payload: AssetRatiosService}>('http://localhost:3000/api/detailed-ratios/:id', assetId)
      .subscribe((responseData) => {
      responseData.payload
    })
  }
}
