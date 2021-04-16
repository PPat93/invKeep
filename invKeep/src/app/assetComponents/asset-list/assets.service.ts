import {assetRecord} from "../../shared/shared";
import {Injectable} from "@angular/core";
impo

@Injectable({providedIn: 'root'})
export class AssetsService{

  private assetsArray: assetRecord[] = [];

  addAssets(assetItem: assetRecord){
    this.assetsArray.push(assetItem);
  }

  getAssets(){
    return [...this.assetsArray];
  }
}
