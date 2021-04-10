import {Component} from '@angular/core';
import {assetRecord} from "./assetComponents/asset-list/asset-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'invKeep';
  assetsAppArray: assetRecord[] = [];

  onAssetAddition(receivedAsset): void {
    this.assetsAppArray.push(receivedAsset);
  }
}
