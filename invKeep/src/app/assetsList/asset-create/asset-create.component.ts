import { Component } from '@angular/core';

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html'
})


export class AssetCreateComponent {

  placeholderAsset: {
    nameFull: string,
    symbol: string,
    amount: number,
    basicPrice: number
    }
  returnedString: string;


  onAssetSave(nameF: HTMLInputElement, symbol: HTMLInputElement, amount: HTMLInputElement, basicPrice: HTMLInputElement){
    this.placeholderAsset = {
      nameFull: nameF.value.toString(),
      symbol: symbol.value.toString(),
      amount: parseFloat(amount.value),
      basicPrice: parseFloat(basicPrice.value)
    }
    let nextItem = document.createElement("DIV");
    nextItem.innerHTML = `Name: ${this.placeholderAsset.nameFull}<br/>Symbol: ${this.placeholderAsset.symbol}<br/>Amount: ${this.placeholderAsset.amount}<br/>Basic Price: ${this.placeholderAsset.basicPrice}<br/> - <br/>`;
    return  document.getElementById('output').appendChild(nextItem);
  };
}
