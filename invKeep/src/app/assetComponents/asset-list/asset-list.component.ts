import {Component, OnInit} from '@angular/core';
import {assetRecord} from "../../shared/shared";
import {AssetsService} from "./assets.service";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent implements OnInit {

  assetsReceivedFromAppComp: assetRecord[];
  panelExpanded: boolean = false;

  constructor(public AssetsService: AssetsService) {
  }

  ngOnInit() {
    this.assetsReceivedFromAppComp = this.AssetsService.getAssets()
  }

}
