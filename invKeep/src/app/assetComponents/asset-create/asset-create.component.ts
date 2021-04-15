import {Component, EventEmitter, Output} from '@angular/core';
import {assetRecord} from "../../shared/shared";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})

export class AssetCreateComponent {

  // Send data to parent component
  @Output() sendCreatedAsset = new EventEmitter<assetRecord>();

  // Create asset object and send it to main app component
  onAssetSave(assetForm: NgForm): void {

    let placeholderAsset = {
      assetName: assetForm.value.fullName,
      assetSymbol: assetForm.value.symbol,
      amount: Math.trunc(assetForm.value.amount),
      buyPrice: assetForm.value.price,
      purchaseDate: `-`
    }

    if (assetForm.value.date) {
      placeholderAsset.purchaseDate = assetForm.value.date.toLocaleString().split(`,`)[0];
    }

    if (!assetForm.invalid) {
      this.sendCreatedAsset.emit(placeholderAsset);
      assetForm.resetForm();
    }
  };

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
      case `date`:
        return `Provided date is invalid.`;
    }
  }
}
