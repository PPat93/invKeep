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
  detailedAssetRatios: DetailedAssetRatios;
    // =
  //   {
  //   id: `60c7c664befdd32674b97405`,
  //   ratiosArray: [
  //     {parameterName: `EPSRatio`, valueNum: 1},
  //     {parameterName: `PERatio`, valueNum: 2},
  //     {parameterName: `PEGRatio`, valueNum: 3},
  //     {parameterName: `CAPERatio`, valueNum: 4},
  //     {parameterName: `PBRatio`, valueNum: 5},
  //     {parameterName: `DERatio`, valueNum: 6},
  //     {parameterName: `ROE`, valueNum: 7},
  //     {parameterName: `ROCERatio`, valueNum: 8},
  //     {parameterName: `DividendYield`, valueNum: 9},
  //     {parameterName: `DPRRatio`, valueNum: 0},
  //     {parameterName: `PSRatio`, valueNum: 11},
  //     {parameterName: `GrahamNum`, valueNum: 12},
  //     {parameterName: `EVtoEBITRatio`, valueNum: 13},
  //     {parameterName: `EVtoEBITDA`, valueNum: 14}
  //   ]
  // }
  ratiosColumns: string[] = [`parameterName`, `valueNum`];

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.assetMainDetails = this.AssetService.getSingleAsset(this.assetId);
    });
    this.detailedAssetRatios = this.getDetailedRatios(this.assetId);
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

  getDetailedRatios(assetId: string): DetailedAssetRatios{
    console.log(this.AssetRatiosService.getDetailedRatios(assetId))
    return this.AssetRatiosService.getDetailedRatios(assetId);

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
