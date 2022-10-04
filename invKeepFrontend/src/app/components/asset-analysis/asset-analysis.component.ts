import { Component, OnInit } from '@angular/core';
import { AssetsService } from "../../services/assets.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AnalyzedData, AssetRecord, AssetAndIndicatorsAnlysis, sanitizeRatioName } from "../../shared/sharedTS";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
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
  ratiosValuesForm: FormGroup;

  analyzedAssetRatios: AnalyzedData[] = [{
    coAnalysis: [``],
    shortDescription: ``,
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

  assetAnalysis: AssetAndIndicatorsAnlysis = {
    assetId: ``,
    ratiosArray: [
      { parameterName: ``, valueNum: null, unit: `` }
    ],
    analyzedData: this.analyzedAssetRatios
  };

  imageFile: File;

  isLoading1: boolean = false;
  isLoading2: boolean = false;

  ratiosColumns: string[] = Object.keys(this.assetAnalysis.ratiosArray[0])
  ratiosAnalysisColumns: string[] = [`name`, `value`, `intervals`, `shortDescription`]

  private ratiosSub: Subscription;
  private ratiosAnalysisSub: Subscription;
  private ratiosWereSavedIndicator: boolean = false;

  constructor(public AssetService: AssetsService, public AssetRatiosService: AssetRatiosService,
    public RatioDetailsService: RatioDetailsService, public route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {

  //  FormControl with uploaded file image validators for the new 'form'. This one is separate from saving ratios 
    let imageForm = new FormControl({
      name: new FormControl(0, { validators: [Validators.pattern(`^.*[.](bmp|jpg|jpeg|png|)$`)] }),
      type: new FormControl(0, { validators: [Validators.pattern(`^image/.*$`)] })
    })

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
        this.createFormGroup(this.assetAnalysis.ratiosArray)
      });
  }

  sanitizeHTMLRatioName(rName: string) {
    return sanitizeRatioName(rName);
  }

  stockTotalCost(): string {
    return (this.assetMainDetails?.buyPrice * this.assetMainDetails?.amount).toFixed(2);
  }

  setUnit(unit: string) {
    return (unit === 'curr') ? this.assetMainDetails.currency : unit;
  }

  saveRatiosValues(): void {
    // TODO - 5 - quite important - add handling of comma and dot ratios 
    this.assetAnalysis.ratiosArray.forEach(ratio => {
      Object.entries(this.ratiosValuesForm.value).forEach(([key, value]) => {
        if (sanitizeRatioName(ratio.parameterName) === key) {
          this.assetAnalysis.ratiosArray[this.assetAnalysis.ratiosArray.indexOf(ratio)].valueNum = Number(value);
        }
      })
    })
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

  //  Sending image file to a service and into backend
  uploadAnalysisImage(imageFile: File){
    this.AssetRatiosService.saveAnalysisImageHttp(imageFile);
  }

  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
    if (this.ratiosWereSavedIndicator) {
      this.ratiosAnalysisSub.unsubscribe();
    }
  }

  openRatioDetails(ratioName: string) {
    this.dialog.open(RatioDetailsDialogComponent, {
      data: ratioName,
      width: `80%`,
      height: `80%`
    })
  }

  // method validating that uploaded file is an image, here file will be stored in a variable that will be send to the backend after confirmation
  onImgSelected(event: Event) {
   let imageFile = (event.target as HTMLInputElement).files[0];
    console.log(imageFile)
  }

  createFormGroup(names: { parameterName: string, valueNum: number, unit: string }[]) {

    //  Dynamic creation of the controllers for all items in form (with all needed validators) 
    //  TODO - 9 - V ERY IMPORTANT to be updated and location changed into onInit.
    let tempGroupFormControl = {};
    names.forEach(element => {
      tempGroupFormControl[sanitizeRatioName(element.parameterName)] = new FormControl(0, { validators: [Validators.required, Validators.maxLength(5), Validators.pattern(`^[0-9]*[.0-9]*$`)] });
    });

    this.ratiosValuesForm = new FormGroup(tempGroupFormControl);

    //  Dynamic assignment of starting values accordingly to values retrieved from DB 
    let oldRatiosValues = {};

    this.analyzedAssetRatios.forEach(item => {
      oldRatiosValues[sanitizeRatioName(item.name)] = item.value;
    })

    this.ratiosValuesForm.setValue(oldRatiosValues);
  }
}