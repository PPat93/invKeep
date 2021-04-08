import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-component',
  templateUrl: './asset-list-item.component.html',
  styleUrls: ['./asset-list-item.component.scss']
})

export class AssetListItemComponent{

  panelExpanded: boolean = false;
}
