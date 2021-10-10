import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetRecord } from "../../shared/sharedTS";
import { AssetsService } from "./assets.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent implements OnInit, OnDestroy {

  assetArray: AssetRecord[] = [];
  private assetSub: Subscription;
  spinnerVisible: boolean = false;
  stopSpinner: boolean = true;
  timeout;

  constructor(public AssetsService: AssetsService) {
  }

  ngOnInit() {
    this.spinnerVisible = true;
    this.AssetsService.getAssets();
    this.assetSub = this.AssetsService.getAssetsUpdateListener()
      .subscribe((assetsSubscribed: AssetRecord[]) => {
        this.assetArray = assetsSubscribed;
      })
  }



  showSpinner(): Promise<boolean> {

    if (this.spinnerVisible) {
      return new Promise((res) => {
        this.timeout = setTimeout(() => {
          console.log(`in timeout +  ${this.spinnerVisible}`);
          clearTimeout(this.timeout);
          this.spinnerVisible = false
          res(this.stopSpinner = false);
        }, 5000);
      })
    } else {
      console.log(`nope`)
      clearTimeout(this.timeout);
      
      return new Promise ((res) => {
        res(false);
      })
    }
  }

  async getData(): Promise<boolean> {
    console.log(`spinner return : ${await this.showSpinner()}`)
    return await this.showSpinner().then(() => {
      clearTimeout(this.timeout);
      return this.stopSpinner = false;
    });
  }


  deleteAsset(assetId: string): void {
    this.AssetsService.deleteAsset(assetId);
  }

  ngOnDestroy() {
    this.assetSub.unsubscribe();
  }
}
