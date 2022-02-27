import { Component, OnInit } from '@angular/core';
import { AssetsService } from "../../services/assets.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AnalyzedData, AssetRecord, DetailedAssetRatiosAnalyzed } from "../../shared/sharedTS";
import { NgForm } from "@angular/forms";
import { AssetRatiosService } from "../../services/asset-ratios.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['asset-details.component.scss']
})

export class AssetDetailsComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;

  // TODO clean below multiple variables that are messed and probably redundant
  detailedAssetRatios: DetailedAssetRatiosAnalyzed = {
    assetId: ``,
    ratiosArray: [
      { parameterName: ``, valueNum: null, unit: `` }
    ],
    analyzedData: [{
      coanalysis: [``],
      description: ``,
      intervals: {
        name: ``,
        numberRating: 0,
        summary: ``,
        verbalRating: ``
      },
      name: ``,
      shortly: [],
      value: 0
    }]
  };

  analyzedDetailedAssetRatios: AnalyzedData[] = [{
    coanalysis: [``],
    description: ``,
    intervals: {
      name: ``,
      numberRating: 0,
      summary: ``,
      verbalRating: ``
    },
    name: ``,
    shortly: [``],
    value: 0
  }];

  isLoading1: boolean = false;
  isLoading2: boolean = false;

  ratiosColumns: string[] = Object.keys(this.detailedAssetRatios.ratiosArray[0])
  ratiosAnalysisColumns: string[] = [`name`, `value`, `intervals`, `description`]

  private ratiosSub: Subscription;
  private ratiosAnalysisSub: Subscription;
  private ratiosWereSavedInd: boolean = false;

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoading1 = true;
    this.isLoading2 = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.AssetService.getSingleAsset(this.assetId).subscribe(singleAsset => {
        this.isLoading1 = false;
        this.assetMainDetails = singleAsset.payload;
      });
    });
    this.AssetRatiosService.getDetailedRatios(this.assetId);
    this.ratiosSub = this.AssetRatiosService.getRatiosUpdateListener()
      .subscribe((ratiosSubscribed: DetailedAssetRatiosAnalyzed) => {
        this.isLoading2 = false;
        this.detailedAssetRatios = ratiosSubscribed;
        this.analyzedDetailedAssetRatios = ratiosSubscribed.analyzedData;
      });
  }

  stockTotalCost(): string {
    return (this.assetMainDetails?.buyPrice * this.assetMainDetails?.amount).toFixed(2);
  }

  setUnit(unit: string) {
    return (unit === 'curr') ? this.assetMainDetails.currency : unit;
  }

  saveDetailedRatios(detailedRatios: NgForm): void {
    for (let ratio in this.detailedAssetRatios.ratiosArray) {
      for (let newRatio in detailedRatios.form.value) {
        if (this.detailedAssetRatios.ratiosArray[ratio].parameterName === (newRatio.substring(1)))
          // because of error that appears if input field has name set only by
          // two way binding it was needed to add a letter that is not dynamic. Here I remove it.
          this.detailedAssetRatios.ratiosArray[ratio].valueNum = Number(detailedRatios.form.value[newRatio]);
      }
    }
    this.detailedAssetRatios.assetId = this.assetId;
    this.AssetRatiosService.saveDetailedRatios(this.assetId, this.detailedAssetRatios);
    this.isLoading2 = true;
    this.ratiosAnalysisSub = this.AssetRatiosService.getRatiosAnalysisListener()
      .subscribe((analysisReturned) => {
        this.analyzedDetailedAssetRatios = analysisReturned;
        this.isLoading2 = false;
        this.ratiosWereSavedInd = true;
      });
  }

  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
    if (this.ratiosWereSavedInd) {
      this.ratiosAnalysisSub.unsubscribe();
    }
  }
}