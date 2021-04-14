import {Component, EventEmitter, Output} from '@angular/core';
import {assetRecord} from "../../shared/shared";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})

export class AssetCreateComponent {

  // Temporary asset inputs
  tempFullName: string = ``;
  tempSymbol: string = ``;
  tempAmount: number = null;
  tempBuyPrice: number = null;
  tempPurchaseDate: Date = null;

  // Disable Add Asset button variable
  disableAddition: boolean;

  // Initialization of asset object
  placeholderAsset: {
    assetName: string,
    assetSymbol: string,
    amount: number,
    buyPrice: number,
    purchaseDate: Date | string
  } = {
    assetName: ``,
    assetSymbol: ``,
    amount: null,
    buyPrice: null,
    purchaseDate: null
  };

  // Send data to parent component
  @Output() sendCreatedAsset = new EventEmitter<assetRecord>();

  disableAddButton(): boolean {
    if ((this.tempFullName === `` || this.tempSymbol === ``) || (this.tempAmount === null || this.tempBuyPrice === null)) {
      return this.disableAddition = true;
    } else {
      return this.disableAddition = false;
    }
  }

  // Create asset object and send it to main app component
  onAssetSave(assetForm: NgForm): void {
    this.placeholderAsset = {
      assetName: assetForm.value.fullName,
      assetSymbol: assetForm.value.symbol,
      amount: Math.trunc(assetForm.value.amount),
      buyPrice: assetForm.value.price,
      purchaseDate: `-`
    }
    if (assetForm.value.date) {
      this.placeholderAsset.purchaseDate = assetForm.value.date.toLocaleString().split(`,`)[0];
    } else {
      this.placeholderAsset.purchaseDate = `-`;
    }

    this.sendCreatedAsset.emit(this.placeholderAsset);
  };
}
