import { Component, OnInit } from '@angular/core';
import { AssetsService } from "../../services/assets.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AnalyzedData, AssetRecord, AssetAndIndicatorsAnlysis } from "../../shared/sharedTS";
import { NgForm } from "@angular/forms";
import { AssetRatiosService } from "../../services/asset-ratios.service";
import { Subscription } from "rxjs";
import { RatioDetailsService } from 'src/app/services/ratio-details.service';
import { MatDialog } from '@angular/material/dialog';
import { RatioDetailsDialogComponent } from '../ratio-details-dialog/ratio-details-dialog.component';

@Component({
  selector: 'app-asset-analysis',
  templateUrl: 'asset-analysis.component.html',
  styleUrls: ['asset-analysis.component.scss']
})

export class AssetAnalysisComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;

  // TODO clean below multiple variables that are messed and probably redundant
  assetAnalysis: AssetAndIndicatorsAnlysis = {
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
      bulletPointSummary: [],
      value: 0
    }]
  };

  analyzedAssetRatios: AnalyzedData[] = [{
    coanalysis: [``],
    description: ``,
    intervals: {
      name: ``,
      numberRating: 0,
      summary: ``,
      verbalRating: ``
    },
    name: ``,
    bulletPointSummary: [``],
    value: 0
  }];

  isLoading1: boolean = false;
  isLoading2: boolean = false;

  ratiosColumns: string[] = Object.keys(this.assetAnalysis.ratiosArray[0])
  ratiosAnalysisColumns: string[] = [`name`, `value`, `intervals`, `description`]

  private ratiosSub: Subscription;
  private ratiosAnalysisSub: Subscription;
  private ratiosWereSavedIndicator: boolean = false;

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService,
    public RatioDetailsService: RatioDetailsService, public route: ActivatedRoute, public dialog: MatDialog) {
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
    this.AssetRatiosService.getAssetRatiosValues(this.assetId);
    this.ratiosSub = this.AssetRatiosService.getRatiosUpdateListener()
      .subscribe((ratiosSubscribed: AssetAndIndicatorsAnlysis) => {
        this.isLoading2 = false;
        this.assetAnalysis = ratiosSubscribed;
        this.analyzedAssetRatios = ratiosSubscribed.analyzedData;
      });
  }

  stockTotalCost(): string {
    return (this.assetMainDetails?.buyPrice * this.assetMainDetails?.amount).toFixed(2);
  }

  setUnit(unit: string) {
    return (unit === 'curr') ? this.assetMainDetails.currency : unit;
  }

  saveRatiosValues(ratiosValues: NgForm): void {
    // TODO add handling of comma and dot ratios 
    for (let ratio in this.assetAnalysis.ratiosArray) {
      for (let newRatio in ratiosValues.form.value) {
        if (this.assetAnalysis.ratiosArray[ratio].parameterName === (newRatio.substring(1)))
          // because of error that appears if input field has name set only by
          // two way binding it was needed to add a letter that is not dynamic. Here I remove it.
          this.assetAnalysis.ratiosArray[ratio].valueNum = Number(ratiosValues.form.value[newRatio]);
      }
    }
    this.assetAnalysis.assetId = this.assetId;
    this.AssetRatiosService.saveRatiosValues(this.assetId, this.assetAnalysis);
    this.isLoading2 = true;
    this.ratiosAnalysisSub = this.AssetRatiosService.getRatiosAnalysisListener()
      .subscribe((analysisReturned) => {
        this.analyzedAssetRatios = analysisReturned;
        this.isLoading2 = false;
        this.ratiosWereSavedIndicator = true;
      });
  }

  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
    if (this.ratiosWereSavedIndicator) {
      this.ratiosAnalysisSub.unsubscribe();
    }
  }

  openRatioDetails(ratioRow: AnalyzedData) {
    this.dialog.open(RatioDetailsDialogComponent, {
      data: { name: ratioRow.name },
    })
  }
}
