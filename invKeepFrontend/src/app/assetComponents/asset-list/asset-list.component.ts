import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssetRecord} from "../../shared/shared";
import {AssetsService} from "./assets.service";
import {Subscription} from "rxjs";
import {AssetCreateComponent} from "../asset-create/asset-create.component";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent implements OnInit, OnDestroy {

  assetArray: AssetRecord[] = [];
  panelExpanded: boolean = false;
  private assetSub: Subscription;

  constructor(public AssetsService: AssetsService) {
  }

  ngOnInit() {
    this.AssetsService.getAssets();
    this.assetSub = this.AssetsService.getAssetsUpdateListener()
      .subscribe((assetsSubscribed: AssetRecord[]) => {
        this.assetArray = assetsSubscribed;
      })
  }

  deleteAsset(assetId: string) {
    this.AssetsService.deleteAsset(assetId);
  }

  ngOnDestroy() {
    this.assetSub.unsubscribe();
  }
}
