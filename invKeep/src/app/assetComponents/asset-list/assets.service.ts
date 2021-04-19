import {AssetRecord} from "../../shared/shared";
import {Injectable} from "@angular/core";
import { Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AssetsService{

  private assetsArray: AssetRecord[] = [];
  private updateAssets = new Subject<AssetRecord[]>();

  addAssets(assetItem: AssetRecord){
    this.assetsArray.push(assetItem);
    this.updateAssets.next([...this.assetsArray]);
  }

  getAssetsUpdateListener(){
    return this.updateAssets.asObservable();
  }
}
