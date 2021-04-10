import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent {

  // Receive asset list from App
  @Input() assetsReceivedFromAppComp: assetRecord[];
}

// Global asset type
export type assetRecord = {
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number
}
