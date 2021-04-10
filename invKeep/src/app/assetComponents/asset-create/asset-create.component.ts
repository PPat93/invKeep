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

  // Disable Add Asset button variable
  disableAddition: boolean;

  // Initialization of asset object
  placeholderAsset: {
    assetName: string,
    assetSymbol: string,
    amount: number,
    buyPrice: number
  } = {
    assetName: ``,
    assetSymbol: ``,
    amount: null,
    buyPrice: null
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
  onAssetSave(nameF: string, symbol: string, amount: number, buyPrice: number): void {
    this.placeholderAsset = {
      assetName: nameF,
      assetSymbol: symbol,
      amount: amount,
      buyPrice: buyPrice
    }

    this.sendCreatedAsset.emit(this.placeholderAsset);
  };

  clearFields() {
    this.tempFullName = ``;
    this.tempSymbol = ``;
    this.tempAmount = null;
    this.tempBuyPrice = null;
  }
}
