import {AssetRecord} from '../../shared/shared';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AssetsService {

  constructor(private http: HttpClient) {
  }

  private assetsArray: AssetRecord[] = [];
  private updateAssets = new Subject<AssetRecord[]>();

  getAssets() {
    this.http.get<{ message: string, payload: any }>(`http://localhost:3000/api/assets`)
      .pipe(map((assetItems) => {
        return assetItems.payload.map(oneAsset => {
          return {
            id: oneAsset._id,
            assetName: oneAsset.assetName,
            assetSymbol: oneAsset.assetSymbol,
            currency: oneAsset.currency,
            amount: oneAsset.amount,
            buyPrice: oneAsset.buyPrice,
            purchaseDate: oneAsset.purchaseDate
          };
        });
      }))
      .subscribe((updatedItems) => {
        this.assetsArray = updatedItems;
        this.updateAssets.next([...this.assetsArray]);
      })
  }

  addAssets(assetItem: AssetRecord) {
    this.http.post<{ message: string }>(`http://localhost:3000/api/assets`, (assetItem))
      .subscribe((responseData) => {
        this.assetsArray.push(assetItem);
        this.updateAssets.next([...this.assetsArray]);
      })
  }

  deleteAsset(assetId: string) {
    this.http.delete(`http://localhost:3000/api/delete/${assetId}`).subscribe(() => {

    })
  }

  getAssetsUpdateListener() {
    return this.updateAssets.asObservable();
  }
}
