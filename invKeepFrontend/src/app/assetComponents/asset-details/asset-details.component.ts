import {Component, OnInit} from '@angular/core';
import {AssetsService} from "../asset-list/assets.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AssetRecord, DetailedAssetRatios} from "../../shared/shared";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;
  detailedAssetRatios = [{parameterName: `CheckPar1`, valueNum: 1},
    {parameterName: `CheckPar5`, valueNum: 2},
    {parameterName: `CheckPar3`, valueNum: 12}
  ];
  ratiosColumns: string[] = [`parameterName`, `valueNum`];

  constructor(public AssetService: AssetsService, public route: ActivatedRoute) {
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
    for (let ratio in this.detailedAssetRatios) {
      for (let newRatio in detailedRatios.form.value) {
        if (this.detailedAssetRatios[ratio].parameterName === newRatio)
          this.detailedAssetRatios[ratio].valueNum = Number(detailedRatios.form.value[newRatio]);
      }
    }
    console.log(this.detailedAssetRatios)
      // [{id: `3a`,parameterName: `CheckPar3`, valueNum: 12}]
      // this.detailedAssetRatios = {
      //
      // }
    }
  }
