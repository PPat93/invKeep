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
      // while asset get assign db _id to frontend asset id
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
    this.http.post<{ message: string, assetId: string }>(`http://localhost:3000/api/assets`, (assetItem))
      .subscribe((responseData) => {
        // update  front asset id with db _id
        assetItem.id = responseData.assetId;
        this.assetsArray.push(assetItem);
        this.updateAssets.next([...this.assetsArray]);
      })
  }

  deleteAsset(assetId: string) {
    this.http.delete(`http://localhost:3000/api/delete/${assetId}`).subscribe(() => {
      // update of asset list with filtering out freshly deleted asset
      this.assetsArray = this.assetsArray.filter(asset => asset.id !== assetId);
      this.updateAssets.next([...this.assetsArray]);
    })
  }

  getSingeAsset(id: string){
    return {...this.assetsArray.find(as => as.id === id)};
  }

  getAssetsUpdateListener() {
    return this.updateAssets.asObservable();
  }
}
