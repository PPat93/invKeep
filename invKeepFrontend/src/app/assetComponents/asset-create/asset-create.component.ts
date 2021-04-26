import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AssetsService} from "../asset-list/assets.service";

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})

export class AssetCreateComponent {

  validationPatterns = {
    fullName: `[a-zA-Z0-9,.-_()]{2,30}$`,
    symbol: `[a-zA-Z0-9.-]{1,6}$`,
    amount: `[0-9]{1,10}$`,
    price: `[0-9.]{1,10}`
  }

  constructor(public AssetsService: AssetsService) {
  }

  // Create asset object and send it to main app component
  onAssetSave(assetForm: NgForm): void {
    if (!assetForm.invalid) {
      let placeholderAsset = {
        assetName: assetForm.value.fullName,
        assetSymbol: assetForm.value.symbol.toLocaleString().toUpperCase(),
        amount: Math.trunc(assetForm.value.amount),
        buyPrice: assetForm.value.price,
        currency: assetForm.value.currency,
        purchaseDate: `-`
      }

      if (assetForm.value.date) {
        placeholderAsset.purchaseDate = assetForm.value.date.toLocaleString().split(`,`)[0];
      }

      this.AssetsService.addAssets(placeholderAsset);
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
