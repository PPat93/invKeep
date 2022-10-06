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
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-asset-analysis',
  templateUrl: 'asset-analysis.component.html',
  styleUrls: ['asset-analysis.component.scss']
})

export class AssetAnalysisComponent implements OnInit {

  assetId: string;
  assetMainDetails: AssetRecord;

  //  FormGroups variables declaration, used to control and validate ratios values and image value
  ratiosFormGroup: FormGroup;
  imageFormGroup: FormGroup;

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
  //  Array containing name of the ratios that has errors, error types, and invalid values, 
  //  retrieved manually from ratios FormGroup ('ratiosFormGroup)
  inputErrorsArray: object[] = [];

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
        this.createFormGroups(this.assetAnalysis.ratiosArray);
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

    //  ->  Errors of invalid values retrieval from ratios FormGroup
    this.retrieveFormErrors();

    if (!this.ratiosFormGroup.invalid) {
      // TODO - 5 - quite important - add handling of comma and dot ratios 
      this.assetAnalysis.ratiosArray.forEach(ratio => {
        Object.entries(this.ratiosFormGroup.value).forEach(([key, value]) => {
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
  }

  /*  ->  Sending image file to a service and then into backend
  *   ->  If no error is retured from Image Form Group (imageFormGroup), the image is passed into the asset 
  *       ratios service
  */
  uploadAnalysisImage(imageFile: File) {
    if (!this.imageFormGroup.invalid)
      this.AssetRatiosService.saveAnalysisImageHttp(imageFile);
  }

  /*  ->  Obtain the value, type of error and name of the ratio whose input value is incorrect
  *   ->  Because of the way of my FormControl creation (dynamic across all ratios), error objects (after invalid
  *       value is introduced) are not automatically added to aggregative 'errors' property inside. Therefore,
  *       it is needed to retrieve them individually, one by one. Here we have iteration through: FormControl, until 
  *       'controls' object is found, then through every single ratio inside, until not null 'errors' property is found
  *       and finally ratio name, invalid validator name and invalid value is retirieved.
  *   ->  All errors are packed into object and pushed to 'inputErrorsArray' array
  */
  retrieveFormErrors() {
    Object.entries(this.ratiosFormGroup).forEach(([controlsobject, ratiosobjects]) => {
      if (controlsobject === 'controls') {
        Object.entries(ratiosobjects).forEach(([singleRatioName, singleRatioProperties]) => {
          if (singleRatioProperties['errors'] !== null) {
            Object.entries(singleRatioProperties['errors']).forEach(([singleErrorName, errorProps]) => {
              this.inputErrorsArray.push(
                {
                  ratioName: singleRatioName,
                  errorTypeName: singleErrorName,
                  invalidValue: errorProps[`actualValue`]
                })
            })
          }
        })
      }
    })
  }

  openRatioDetails(ratioName: string) {
    this.dialog.open(RatioDetailsDialogComponent, {
      data: ratioName,
      width: `80%`,
      height: `80%`
    })
  }

  /*  ->  Image FormGroup value setting 
  *   ->  Newly attached file is assigned as a new value to the FormGroup
  */
  onImgSelected(event: Event) {
    let imageFile = (event.target as HTMLInputElement).files[0];
    this.imageFormGroup.setValue(imageFile);
  }

  createFormGroups(names: { parameterName: string, valueNum: number, unit: string }[]) {

    /*  ->  Dynamic creation of the controllers for all ratios items in the form (with all needed validators) 
    *   ->  Needed to be created inside OnInit method, but also it had to be done after ratios items 
    *       are received from the backend, cause they are also dynamically created.
    *   ->  Here,temporary Form Control object (tempGroupFormControl) is created, after getting FormControls for 
    *       each ratio received form the backend, it is passed as a new FormGroip for global ratios Form Group
    */
    let tempGroupFormControls = {};

    names.forEach(element => {
      tempGroupFormControls[sanitizeRatioName(element.parameterName)] = new FormControl(0, { validators: [Validators.maxLength(5), Validators.pattern(`^[0-9]*[.0-9]*$`)] });
    });

    this.ratiosFormGroup = new FormGroup(tempGroupFormControls);

    /*  ->  Dynamic assignment of starting values accordingly to values retrieved from DB 
    *   ->  Each value retrieved from the backend is assigned to an appropriate ratio, all of them are gathered
    *       inside one temporary value object (oldRatiosValues), which is used as an initial value for all ratios 
    *       form.     
    */
    let oldRatiosValues = {};

    this.analyzedAssetRatios.forEach(item => {
      oldRatiosValues[sanitizeRatioName(item.name)] = item.value;
    })

    this.ratiosFormGroup.setValue(oldRatiosValues);

    /*  ->  FormControl with uploaded file image validators for the new 'form'. This one is separate from saving ratios 
    *   ->  Separate Form Controls are created for another form (the one for image save). File type and extension are
    *       checked in validators in order to preven invalid file attachment.
    *   ->  After creation new FormGroup, directly for image upload is created on the basis of imageFormControl object
    */
    let imageFormControls = {
      name: new FormControl(null, { validators: [Validators.pattern(`^.*[.](bmp|jpg|jpeg|png|)$`)] }),
      type: new FormControl(null, { validators: [Validators.pattern(`^image/.*$`)] })
    };

    this.imageFormGroup = new FormGroup(imageFormControls);
  }

  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
    if (this.ratiosWereSavedIndicator) {
      this.ratiosAnalysisSub.unsubscribe();
    }
  }
}