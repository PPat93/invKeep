import {Component} from '@angular/core';
import {assetRecord} from "./shared/shared";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'invKeep';

  // Receive asset from create asset component
  assetsAppArray: assetRecord[] = [];

  // Add newly created asset to array
  onAssetAddition(receivedAsset): void {
    this.assetsAppArray.push(receivedAsset);
  }
}
