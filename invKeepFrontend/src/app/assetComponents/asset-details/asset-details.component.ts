import {Component, OnInit} from '@angular/core';
import {AssetsService} from "../asset-list/assets.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AssetRecord, DetailedAssetRatios} from "../../shared/shared";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;
  detailedAssetRatios = [{parameterName: `CheckPar`, valueNum: 12},
    {parameterName: `CheckPar`, valueNum: 12},
    {parameterName: `CheckPar`, valueNum: 12}
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

  stockTotalCost() {
    const totalPrice: string = (this.assetMainDetails.buyPrice * this.assetMainDetails.amount).toFixed(2);
    return totalPrice;
  }

  getDetailedRatios() {

  }

  saveDetailedRatios(detailedRatios) {
    console.log(detailedRatios)

  }
}
