import {Component, Input} from '@angular/core';
import {assetRecord} from "../../shared/shared";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent {

  // Receive asset list from App
  @Input() assetsReceivedFromAppComp: assetRecord[];
}
