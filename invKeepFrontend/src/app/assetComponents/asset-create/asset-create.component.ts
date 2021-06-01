import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AssetsService} from "../asset-list/assets.service";
import {AssetRecord} from "../../shared/shared";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})

export class AssetCreateComponent implements OnInit {

  actionMode: CreateComponentMode;
  assetId: string;
  editedAsset: AssetRecord;

  validationPatterns = {
    fullName: `[a-zA-Z0-9,._ ()\-]{2,30}$`,
    symbol: `[a-zA-Z0-9.\-]{1,6}$`,
    amount: `[0-9]{1,10}$`,
    price: `[0-9.]{1,10}`
  }

  constructor(public AssetsService: AssetsService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has(`assetId`)) {
        this.actionMode = CreateComponentMode.edit;
        this.assetId = paramMap.get(`assetId`)
        this.editedAsset = this.AssetsService.getSingeAsset(this.assetId);
      } else {
        this.actionMode = CreateComponentMode.create;
        this.assetId = null;
      }
    });
  }

  // Create asset object and send it to main app component
  onAssetSave(assetForm: NgForm): void {
    if (!assetForm.invalid) {
      let placeholderAsset = {
        id: this.assetId,
        assetName: assetForm.value.fullName,
        assetSymbol: assetForm.value.symbol.toLocaleString().toUpperCase(),
        amount: Math.trunc(assetForm.value.amount),
        buyPrice: Number(assetForm.value.price),
        currency: assetForm.value.currency,
        purchaseDate: `-`
      }

      if (assetForm.value.date) {
        placeholderAsset.purchaseDate = assetForm.value.date.toLocaleString().split(`,`)[0];
      }

      switch (this.actionMode) {
        case CreateComponentMode.create:
          this.AssetsService.addAsset(placeholderAsset);
          break;
        case CreateComponentMode.edit:
          this.AssetsService.editAsset(placeholderAsset);
          break;
        default:
      }
      assetForm.resetForm();
    }
  }

  getErrorMessage(formName: string): string {
    switch (formName) {
      case `fullName`:
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
