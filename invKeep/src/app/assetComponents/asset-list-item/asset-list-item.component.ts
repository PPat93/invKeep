import {Component, Input} from '@angular/core';
import {assetRecord} from "../asset-list/asset-list.component";

@Component({
  selector: 'app-asset-component',
  templateUrl: './asset-list-item.component.html',
  styleUrls: ['./asset-list-item.component.scss']
})

export class AssetListItemComponent{

  panelExpanded: boolean = false;

  @Input() assetArrayReceived: assetRecord;

  ngOnInit(): void{

  }
}
