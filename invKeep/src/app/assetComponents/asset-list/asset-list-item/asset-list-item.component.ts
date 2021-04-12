import {Component, Input} from '@angular/core';
import {assetRecord} from "../../../shared/shared";

@Component({
  selector: 'app-asset-component',
  templateUrl: './asset-list-item.component.html',
  styleUrls: ['./asset-list-item.component.scss']
})

export class AssetListItemComponent {

  panelExpanded: boolean = false;

  // Receive single asset from list component
  @Input() listSingleAsset: assetRecord;
}
