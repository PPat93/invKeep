import {Component, OnInit} from '@angular/core';
import {AssetsService} from "../asset-list/assets.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AssetRecord, DetailedAssetRatios} from "../../shared/shared";
import {NgForm} from "@angular/forms";
import {AssetRatiosService} from "./asset-ratios.service";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;
  detailedAssetRatios = {
    id: ``,
    ratiosArray: [
      {parameterName: `EPSRatio`, valueNum: 1},
      {parameterName: `PERatio`, valueNum: 2},
      {parameterName: `PEGRatio`, valueNum: 12}
    ]
  }
  ratiosColumns: string[] = [`parameterName`, `valueNum`];

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.assetMainDetails = this.AssetService.getSingleAsset(this.assetId);
    })
  }

  // findRatioInArray(ratioName: string) : number{
  //   for(let i in this.detailedAssetRatios){
  //     if(this.detailedAssetRatios[i].parameterName == ratioName){
  //       return this.detailedAssetRatios[i].valueNum;
  //     }
  //   }
  // }

  stockTotalCost() {
    const totalPrice: string = (this.assetMainDetails.buyPrice * this.assetMainDetails.amount).toFixed(2);
    return totalPrice;
  }

  getDetailedRatios() {

  }

  saveDetailedRatios(detailedRatios: NgForm) {
    for (let ratio in this.detailedAssetRatios.ratiosArray) {
      for (let newRatio in detailedRatios.form.value) {
        if (this.detailedAssetRatios.ratiosArray[ratio].parameterName === newRatio)
          this.detailedAssetRatios.ratiosArray[ratio].valueNum = Number(detailedRatios.form.value[newRatio]);
      }
    }
    this.detailedAssetRatios.id = this.assetId;
    this.AssetRatiosService.saveDetailedRatios(this.assetId, this.detailedAssetRatios);
  }
}
