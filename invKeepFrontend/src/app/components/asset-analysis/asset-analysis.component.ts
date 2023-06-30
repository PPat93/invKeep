import { Component, OnInit } from '@angular/core';
import { AssetsService } from "../../services/assets.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AnalyzedData, AssetRecord, AssetAndIndicatorsAnlysis, sanitizeRatioName } from "../../shared/sharedTS";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AssetRatiosService } from "../../services/asset-ratios.service";
import { Subscription } from "rxjs";
import { RatioDetailsService } from 'src/app/services/ratio-details.service';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { RatioDetailsDialogComponent } from '../ratio-details-dialog/ratio-details-dialog.component';
import { mimeValidator } from './mime-type.validator';
import { AssetImageService } from 'src/app/services/asset-image.service';

@Component({
  selector: 'app-asset-analysis',
  templateUrl: 'asset-analysis.component.html',
  styleUrls: ['asset-analysis.component.scss']
})

export class AssetAnalysisComponent implements OnInit {

  //  ID of the analyzed asset
  assetId: string;

  //  Basic data of the asset that are displayed at the top of the page - name, syymbol, currency, etc.
  assetMainDetails: AssetRecord;

  //  FormGroups variables declaration, used to control and validate ratios values and image value
  ratiosFormGroup: UntypedFormGroup;
  imageFormGroup: UntypedFormGroup;

  //  Image preview holding variable
  imagePreview: string = null;

  // Variables holding image weight values
  imageWeight: number = null;
  isSizeBelow2Mb: boolean = false;

  //  Attached image file holding variable
  imageFile: File;
  imageFilePath: string = ``;
  imageFileReader: FileReader;

  //  Object holding all data retrieved from the backend after ratios values analysis. Here it is defined and initialized
  //  with empty values/0 values
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

  //  Object holding defined above object with all analyzed data, asset id and all ratios names, values and units in one
  //  ratiosArray array
  assetAnalysis: AssetAndIndicatorsAnlysis = {
    assetId: ``,
    ratiosArray: [
      { parameterName: ``, valueNum: null, unit: `` }
    ],
    analyzedData: this.analyzedAssetRatios
  };

  //  Array containing name of the ratios that has errors, error types, and invalid values, 
  //  retrieved manually from ratios FormGroup (ratiosFormGroup)
  inputErrorsArray: object[] = [];

  //  variables holding status of any loading spinners that can be shown on the page
  isLoading1: boolean = false;
  isLoading2: boolean = false;
  isLoadingImg: boolean = false;

  //  Variable controlling visability of the Image Save Button
  hideImageSaveBtn: boolean = true;

  ratiosColumns: string[] = Object.keys(this.assetAnalysis.ratiosArray[0])
  ratiosAnalysisColumns: string[] = [`name`, `value`, `intervals`, `shortDescription`]

  private ratiosSub: Subscription;
  private ratiosAnalysisSub: Subscription;
  private ratiosImageSub: Subscription;
  private ratiosWereSavedIndicator: boolean = false;

  constructor(
    public AssetService: AssetsService,
    public AssetRatiosService: AssetRatiosService,
    public AssetImageService: AssetImageService,
    public RatioDetailsService: RatioDetailsService,
    public route: ActivatedRoute,
    public dialog: MatDialog) {
  }

  ngOnInit() {

    this.isLoading1 = true;
    this.isLoading2 = true;
    this.isLoadingImg = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.assetId = paramMap.get(`assetId`);
      this.AssetService.getSingleAsset(this.assetId).subscribe(singleAsset => {
        this.isLoading1 = false;
        this.assetMainDetails = singleAsset.payload;
      });
    });

    //  init section retrieving image file from the backend, if it is returned, img path is assigned to the imageFilePath variable
    //  in case that file is not found, empty string is assigned. At the end of this part, the loading spinner is turned off
    this.AssetImageService.getImageFile(this.assetId);
    this.ratiosImageSub = this.AssetImageService.getImageFileGetListener()
      .subscribe(retrievedImage => {
        this.imageFilePath = retrievedImage.imgPath;
        this.isLoadingImg = false;
      });

    //  init section retrieving asset ratios values from the backend, both asset ratios values and asset ratios analysis are retrieved here.
    //  createFormGroups are responsible for creating and initializing all FormGroups on analysis page - both ratios FormGroup and image analysis
    //  FormGroup. Eventuall, after all of these steps, loading spinner is hidden and the table is displayed     
    this.AssetRatiosService.getAssetRatiosValues(this.assetId);
    this.ratiosSub = this.AssetRatiosService.getRatiosUpdateListener()
      .subscribe((ratiosSubscribed: AssetAndIndicatorsAnlysis) => {
        this.assetAnalysis = ratiosSubscribed;
        this.analyzedAssetRatios = ratiosSubscribed.analyzedData;
        this.createFormGroups(this.assetAnalysis.ratiosArray);
        this.isLoading2 = false;
      });
  }

  sanitizeHTMLRatioName(rName: string) {
    return sanitizeRatioName(rName);
  }

  stockTotalCost(): string {
    return (this.assetMainDetails?.buyPrice * this.assetMainDetails?.amount).toFixed(2);
  }

  setUnit(unit: string) {
    return (unit === `curr`) ? this.assetMainDetails.currency : unit;
  }

  saveRatiosValues(): void {

    //  Errors of invalid values retrieval from ratios FormGroup
    this.retrieveFormErrors();

    if (!this.ratiosFormGroup.invalid) {
      this.assetAnalysis.ratiosArray.forEach(ratio => {
        Object.entries(this.ratiosFormGroup.value).forEach(([key, value]) => {
          if (sanitizeRatioName(ratio.parameterName) === key) {

            //  Handling comma if provided in a ratio value, replaced with dot
            if (value.toString().includes(`,`)) {
              value = value.toString().replace(/,/g, `.`)
            }

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

      //  Resetting ratios error array after successful ratios update
      this.inputErrorsArray = [];
    }
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
      if (controlsobject === `controls`) {
        Object.entries(ratiosobjects).forEach(([singleRatioName, singleRatioProperties]) => {
          if (singleRatioProperties[`errors`] !== null) {
            Object.entries(singleRatioProperties[`errors`]).forEach(([singleErrorName, errorProps]) => {
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

  createErrorMessages() {
    let tempErrorString;
    this.inputErrorsArray.forEach(singleError => {
      // TODO - 6 - next step - create item that will be displayed as an error
    })
    return tempErrorString;
  }

  //  ->  Set parameters of the dialogs and pass data displayed inside dialogs
  openRatioDetails(ratioName: string) {
    this.dialog.open(RatioDetailsDialogComponent, {
      data: ratioName,
      width: `80%`,
      height: `80%`
    })
  }

  /*  ->  Evaluating final status of imageFormGroup validity
  *   ->  Because async validator takes some time to perform it was needed to wait for the change.
  *       It is done by subscribing on the whole imageFormGroup statusChange property, which indicates
  *       status change as soon as it occurs. Because of that, Promise usage was needed, as Subscription
  *       is awaited asynchronously, so the Promise returns corrrectly/incorrectly executed task confirmation
  *       (as a boolean if finished or null if error).
  *   ->  During validity analysis done by async validator, it has PENDING status. After finish new status 
  *       appears, its value is compared with possible outcomes.
  *   ->  Depending on the outcome, save button visibility controlling variable is set to true or false.
  *       Invalid validation also cleans imagePreview and imageFile variables. 
  *   ->  At the end, unsubscription occurs so resources are not wasted. 
  *   ->  Finally, promise is resolved with true or false return value (depending on valid or invalid outcome) 
  *       or is rejected after 5 seconds of waiting.
  */
  getActualStatusOfImageForm(): Promise<boolean> {

    //  Promise, so it can be checked and returned asynchronously
    return new Promise((resolve, reject) => {

      //  imgSubscription variable is defined, so it can be unsubscribed just after validation is conducted
      //  subscription on imageForm status change allows finding the moment when async validator finishes execution
      let imgSubscription = this.imageFormGroup.statusChanges.subscribe(status => {

        //  INVALID, VALID and IN PROGRESS can appear as a status for a FormGroup 
        if (status === `INVALID`) {

          //  After invalid status of the image form occurs, preview variable and image file holding variable are
          //  cleared. Save image button is invisible, subscription on statusChange is unsubscribed and the
          //  promise is resolved with false boolean value returned.
          this.imagePreview = null;
          this.imageFile = null;
          this.hideImageSaveBtn = true;
          imgSubscription.unsubscribe();
          resolve(false);

        } else if (status === `VALID`) {

          //  After valid status of the image form occurs, Save file button is eanbled, similarly to Invalid status,
          //  subscription on statusChange is unsubscribed and the promise is resolved with a true boolean avlue returned.
          this.hideImageSaveBtn = false;
          imgSubscription.unsubscribe();
          resolve(true);
        }

        // In case that anything goes wrong, the promise is rejected with a null value returned after 5 seconds.
        setTimeout(() => {
          reject(null);
        }, 5000);
      })
    })
  }

  /*  ->  imageFormGroup value setting 
  *   ->  Newly attached file is assigned as a new value to the imageFormGroup FormGroup, file name and
  *       file type are passed. 
  *   ->  Depending on these values, validity of the form is checked and if validators are ok, Save button 
  *       is activated. 
  *   ->  File reader assigns all processing results to imagePreview variable, as a string if validation passed.
  */
  onImgSelected(event: Event) {

    //  Single file attached to the form is assigned to the imageFile variable, value inside imageFormGroup is updated
    //  with new file and it's properties. Also, asynchronous mime_type validator is recalled.
    this.imageFile = (event.target as HTMLInputElement).files[0];
    this.imageFormGroup.patchValue({ name: this.imageFile.name, type: this.imageFile.type, size: this.imageFile.size, mime_type: this.imageFile });
    this.imageFormGroup.get(`mime_type`).updateValueAndValidity();

    //  Image file reader that process attached file. On load, it will set dependency of all file reading 
    //  results as a string value to imagePreviev variable.
    this.imageFileReader = new FileReader();
    this.imageFileReader.onload = () => {
      this.imagePreview = this.imageFileReader.result as string;
      this.imageWeight = this.imagePreview.length;

      // TODO -> future image size validation
      // console.log(this.isSizeBelow2Mb)
      // this.isSizeBelow2Mb = false; 
      // console.log(this.imageWeight)
      // if (this.imageWeight * 2 < 2 ** 21) {
      //   this.isSizeBelow2Mb = true;
      // }
    }

    /*  ->  Showing/hiding image Save button depending on file attached
    *   ->  If file that is attached has extension of bmp or jpg or jpeg or png and has a type of image/* and
    *       it's MIME type is within png/jpg magic numbers then imageFormGroup FormGroup is valid and 
    *       hideImageSaveBtn boolean variable is set to false. It happens inside getActualStatusOfImageForm()
    *       method because of time needed for async validator time.
    */
    this.getActualStatusOfImageForm().then(result => {

      //  Create an image preview when all validators attached to a image form group are passed: uploaded 
      //  file is really an image. Otherwise, old preview is cleaned as an empty string is set for imagePreview 
      //  (that is assigned to an img param in HTML)
      if (result === true) {
        this.imageFileReader.readAsDataURL(this.imageFile);
      }
    }).catch(e => {

      //  If, for some reason, image validation promise was rejected, error is caught here and an error message is
      //  written in the console.
      console.log(`Something went wrong with file validation.`)
    })
  }

  /*  ->  Sending image file to a service and then into backend
  *   ->  If no error is retured from Image Form Group (imageFormGroup), the image is passed into the asset 
  *       ratios service
  */
  uploadAnalysisImage() {
    if (!this.imageFormGroup.invalid) {
      this.AssetImageService.saveImageFile(this.imageFile, this.assetId);
    }
    this.hideImageSaveBtn = true;
  }

  /*  ->  Creation of all used in Analysis page
  *   ->  ratiosFormGroup is created with two validators for each inputed value
  *   ->  imageFormGroup is created with two validators for image upload value
  */
  createFormGroups(names: { parameterName: string, valueNum: number, unit: string }[]) {

    //  Dynamic creation of the controllers for all ratios items in the form (with all needed validators) 
    //  Needed to be created inside OnInit method, but also it had to be done after ratios items 
    //  are received from the backend, cause they are also dynamically created.
    //  Here,temporary Form Control object (tempGroupFormControl) is created, after getting FormControls for 
    //  each ratio received form the backend, it is passed as a new FormGroip for global ratios Form Group
    let tempGroupFormControls = {};

    names.forEach(element => {

      //  Maximum 7 chars, valid examples: 123.123; 12.1; 1.1; 5; 0.123; 1234; etc. -> and all of them with comma instead of dot
      //  Everything else is invalid
      tempGroupFormControls[sanitizeRatioName(element.parameterName)] = new UntypedFormControl(0, { validators: [Validators.maxLength(7), Validators.pattern(`^([0-9]{1,3}[.,]{0,1}[0-9]{1,3})$|^([0-9]{1})$`)] });
    });

    this.ratiosFormGroup = new UntypedFormGroup(tempGroupFormControls);

    //  Dynamic assignment of starting values accordingly to values retrieved from DB 
    //  Each value retrieved from the backend is assigned to an appropriate ratio, all of them are gathered
    //  inside one temporary value object (oldRatiosValues), which is used as an initial value for all ratios 
    //  form.
    let oldRatiosValues = {};

    this.analyzedAssetRatios.forEach(item => {
      oldRatiosValues[sanitizeRatioName(item.name)] = item.value;
    })

    this.ratiosFormGroup.setValue(oldRatiosValues);

    //  FormControl with uploaded file image validators for the new 'form'. This one is separate from saving ratios 
    //  Separate Form Controls are created for another form (the one for image save). File type and extension are
    //  checked in validators in order to preven invalid file attachment.
    //  After creation new FormGroup, directly for image upload is created on the basis of imageFormControl object 
    let imageFormControls = {

      //  Any file with jpg, jpeg or png extension is accepted by first pattern validator and simultaneously the file
      //  type that is accepted must be any image one: image/* 
      name: new UntypedFormControl(``, { validators: [Validators.pattern(/^.*[.](jpg|jpeg|png)$/i)] }),
      type: new UntypedFormControl(``, { validators: [Validators.pattern(/^image\/.*$/)] }),
      size: new UntypedFormControl(0, { validators: [Validators.max(2097152)] }),
      mime_type: new UntypedFormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeValidator]
      })
    };

    this.imageFormGroup = new UntypedFormGroup(imageFormControls);
  }

  /*  ->  Unsubscribing of subscriptions created for the Analysis component
  *   ->  In the moment that the ANalysis component is destroyed, ratiosSub, that is subscription for receiving
  *       all ratios values, is unsubscribed. The same is done with ratiosAnalysisSub that is receiving changes   
  *       on Analyzed data. However, the latest is unsubscribed only if ratios were previously saved, cause the 
  *       subscription is created only after ratios were saved (initial analysis retrieval is done by default, 
  *       without subscription). Unsubscribe method shouldn't be called without prior subscription.
  */
  ngOnDestroy() {
    this.ratiosSub.unsubscribe();
    this.ratiosImageSub.unsubscribe();
    if (this.ratiosWereSavedIndicator) {
      this.ratiosAnalysisSub.unsubscribe();
    }
  }
}