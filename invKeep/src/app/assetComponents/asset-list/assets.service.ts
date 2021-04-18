import {assetRecord} from "../../shared/shared";
import {Injectable} from "@angular/core";
import { Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AssetsService{

  private assetsArray: assetRecord[] = [];
  private updateAssets = new Subject<assetRecord[]>();

  addAssets(assetItem: assetRecord){
    this.assetsArray.push(assetItem);
    this.updateAssets.next([...this.assetsArray]);
  }

  getAssetsUpdateListener(){
    return this.updateAssets.asObservable();
  }
}
