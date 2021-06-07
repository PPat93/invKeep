import {Component, OnInit} from '@angular/core';
import {AssetsService} from "../asset-list/assets.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AssetRecord} from "../../shared/shared";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;

  constructor(public AssetService: AssetsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.assetMainDetails = this.AssetService.getSingleAsset(this.assetId);
    })
  }
}
