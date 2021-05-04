import {AssetRecord} from '../../shared/shared';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AssetsService {

  constructor(private http: HttpClient) {
  }

  private assetsArray: AssetRecord[] = [];
  private updateAssets = new Subject<AssetRecord[]>();

  getAssets() {
    this.http.get<{ message: string, payload: AssetRecord[] }>('http://localhost:3000/api/assets')
      .subscribe((assetData) => {
        this.assetsArray = assetData.payload;
        this.updateAssets.next([...this.assetsArray]);
      })
  }

  addAssets(assetItem: AssetRecord) {
    this.http.post<{ message: string }>('http://localhost:3000/api/assets', (assetItem))
      .subscribe((responseData) => {
        console.log(responseData);
        this.assetsArray.push(assetItem);
        this.updateAssets.next([...this.assetsArray]);
      })

  }

  getAssetsUpdateListener() {
    return this.updateAssets.asObservable();
  }
}
