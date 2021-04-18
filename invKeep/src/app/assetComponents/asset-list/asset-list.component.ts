import {Component, OnDestroy, OnInit} from '@angular/core';
import {assetRecord} from "../../shared/shared";
import {AssetsService} from "./assets.service";
import { Subscription} from "rxjs";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent implements OnInit, OnDestroy {

  assetArray: assetRecord[] = [];
  panelExpanded: boolean = false;
  private assetSub: Subscription;

  constructor(public AssetsService: AssetsService) {
  }

  ngOnInit() {
    this.assetSub = this.AssetsService.getAssetsUpdateListener().subscribe((assetsSubscribed: assetRecord[]) => {
      this.assetArray = assetsSubscribed;
    })
  }

  ngOnDestroy(){
    this.assetSub.unsubscribe();
  }
}
