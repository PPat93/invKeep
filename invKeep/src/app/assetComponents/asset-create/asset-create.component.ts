import {Component, EventEmitter, Output} from '@angular/core';
import {stringify} from "querystring";

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
  @Output() sendCreatedAsset = new EventEmitter();

  disableAddButton(): boolean {
    if ((this.tempFullName === `` || this.tempSymbol === ``) || (this.tempAmount === null || this.tempBuyPrice === null)) {
      return this.disableAddition = true;
    } else {
      return this.disableAddition = false;
    }
  }

  // Create asset object and send it to main app component
  onAssetSave(nameF: string, symbol: string, amount: number, buyPrice: number, purchaseDate?: Date): void {
    this.placeholderAsset = {
      assetName: nameF,
      assetSymbol: symbol,
      amount: amount,
      buyPrice: buyPrice,
      purchaseDate: `-`
    }
    if (purchaseDate) {
      console.log(purchaseDate.toLocaleString().slice(0, 10))
      this.placeholderAsset.purchaseDate = purchaseDate.toLocaleString().slice(0, 9);
    }else{
      this.placeholderAsset.purchaseDate = `-`;
    }

    this.sendCreatedAsset.emit(this.placeholderAsset);
  };

  // Clear data from input fields
  clearFields() {
    this.tempFullName = ``;
    this.tempSymbol = ``;
    this.tempAmount = null;
    this.tempBuyPrice = null;
    this.tempPurchaseDate = null;
  }
}
