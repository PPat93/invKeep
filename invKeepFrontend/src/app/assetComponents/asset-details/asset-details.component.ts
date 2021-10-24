import { Component, OnInit } from '@angular/core';
import { AssetsService } from "../asset-list/assets.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetRecord, DetailedAssetRatios } from "../../shared/sharedTS";
import { NgForm } from "@angular/forms";
import { AssetRatiosService } from "./asset-ratios.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;
  detailedAssetRatios: DetailedAssetRatios = {
    assetId: ``,
    ratiosArray: [
      { parameterName: ``, valueNum: null }
    ]
  };
  ratiosColumns: string[] = [`parameterName`, `valueNum`];
  private ratiosSub: Subscription;

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.AssetService.getSingleAsset(this.assetId).subscribe(singleAsset => {
        this.assetMainDetails = singleAsset.payload;
      });
    });
    this.AssetRatiosService.getDetailedRatios(this.assetId);
    this.ratiosSub = this.AssetRatiosService.getRatiosUpdateListener()
      .subscribe((ratiosSubscribed: DetailedAssetRatios) => {
        this.detailedAssetRatios = ratiosSubscribed;
      });
  }

  stockTotalCost(): string {
    return (this.assetMainDetails?.buyPrice * this.assetMainDetails?.amount).toFixed(2);
  }

  saveDetailedRatios(detailedRatios: NgForm): void {
    for (let ratio in this.detailedAssetRatios.ratiosArray) {
      for (let newRatio in detailedRatios.form.value) {
        if (this.detailedAssetRatios.ratiosArray[ratio].parameterName === (newRatio.substring(1))) // because of error that appears if input field has name set only by
          // two way binding it was needed to add a letter that is not dynamic. Here I remove it.
          this.detailedAssetRatios.ratiosArray[ratio].valueNum = Number(detailedRatios.form.value[newRatio]);
      }
    }
    this.detailedAssetRatios.assetId = this.assetId;
    this.AssetRatiosService.saveDetailedRatios(this.assetId, this.detailedAssetRatios);
  }

  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
  }
}
