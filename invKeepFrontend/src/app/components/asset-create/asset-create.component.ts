import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AssetsService } from "../../services/assets.service";
import { AssetRecord } from "../../shared/sharedTS";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})

export class AssetCreateComponent implements OnInit {

  actionMode: CreateComponentMode;
  assetButton: string;
  assetId: string;
  isLoading: boolean = false;
  usedAsset: AssetRecord;
  assetForm: UntypedFormGroup;
  pageTitle: string = `Create asset:`;


  constructor(public AssetsService: AssetsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.assetForm = new UntypedFormGroup({
      _id: new UntypedFormControl(``),
      id: new UntypedFormControl(``),
      assetName: new UntypedFormControl(``, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(`^[a-zA-Z0-9 .\-]*$`)] }),
      assetSymbol: new UntypedFormControl(``, { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(6), Validators.pattern(`^[a-zA-Z0-9,._ ()\-]*$`)] }),
      amount: new UntypedFormControl(null, { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(`^[0-9]*$`)] }),
      buyPrice: new UntypedFormControl(null, { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern(`^[0-9]*[.0-9]*$`)] }),
      currency: new UntypedFormControl(``, { validators: [Validators.required, Validators.pattern(`^[¥€$£]$`)] }),
      purchaseDate: new UntypedFormControl(``)
    });
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has(`assetId`)) {
        this.actionMode = CreateComponentMode.edit;
        this.pageTitle = `Edit asset:`;
        this.assetButton = `Edit asset`;
        this.assetId = paramMap.get(`assetId`)
        this.AssetsService.getSingleAsset(this.assetId).subscribe(singleAsset => {
          this.isLoading = false;
          this.usedAsset = singleAsset.payload;
          this.usedAsset.purchaseDate = new Date(this.usedAsset.purchaseDate);
          this.assetForm.patchValue(this.usedAsset);
        });
      } else {
        this.actionMode = CreateComponentMode.create;
        this.assetButton = `Create asset`;

        this.usedAsset = {
          _id: ``,
          id: ``,
          assetName: ``,
          assetSymbol: ``,
          amount: null,
          buyPrice: null,
          currency: ``,
          purchaseDate: ``
        };
        this.assetId = null;
        this.isLoading = false;
      }
    });
  }

  // Create asset object and send it to main app component
  onAssetSave(): void {
    if (!this.assetForm.invalid) {
      let placeholderAsset = {
        _id: ``,
        id: this.assetId,
        assetName: this.assetForm.value.assetName,
        assetSymbol: this.assetForm.value.assetSymbol.toLocaleString().toUpperCase(),
        amount: Math.trunc(this.assetForm.value.amount),
        buyPrice: Number(this.assetForm.value.buyPrice),
        currency: this.assetForm.value.currency,
        purchaseDate: `-`
      }

      if (this.assetForm.value.purchaseDate) {
        placeholderAsset.purchaseDate = this.assetForm.value.purchaseDate.toLocaleString().split(`,`)[0];

      }

      switch (this.actionMode) {
        case CreateComponentMode.create:
          this.isLoading = true;
          this.AssetsService.addAsset(placeholderAsset);
          this.assetForm.reset();
          break;

        case CreateComponentMode.edit:
          this.isLoading = true;
          this.AssetsService.editAsset(placeholderAsset);
          break;

        default:
      }
      this.isLoading = false;
    }
  }

  getErrorMessage(formName: string): string {
    switch (formName) {
      case `assetName`:
        return `Please provide valid asset name.`;
      case `symbol`:
        return `Please provide valid asset symbol.`;
      case `amount`:
        return `Please provide valid whole number amount.`;
      case `price`:
        return `Please provide valid price.`;
      case `currency`:
        return `Please select valid currency.`;
      case `date`:
        return `Provided date is invalid.`;
      default:
        return `Something went wrong. Please contact with developer.`;
    }
  }
}

export enum CreateComponentMode {
  create = 0,
  edit = 1
}
