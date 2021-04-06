import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-assets-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss']
})


export class AssetCreateComponent {

  placeholderAsset: {
    nameFull: string,
    symbol: string,
    amount: number,
    basicPrice: number
    }
  returnedString: string;

  onAssetSave(nameF: HTMLInputElement, symbol: HTMLInputElement, amount: HTMLInputElement, basicPrice: HTMLInputElement) {

    this.placeholderAsset = {
      nameFull: nameF.value.toString(),
      symbol: symbol.value.toString(),
      amount: parseFloat(amount.value),
      basicPrice: parseFloat(basicPrice.value)
    }

    let nextItem = document.createElement(`DIV`);
    let nextItemButton = document.createElement(`BUTTON`);

    nextItemButton.setAttribute(`value`, `Remove`);
    nextItemButton.setAttribute(`class`, `remove`);
    nextItemButton.setAttribute(`id`, `${this.placeholderAsset.nameFull}`);
    nextItemButton.innerText = `Remove!`;
    nextItemButton.addEventListener('click', (e) => {
      this.removeItem(e);
    });

    nextItem.innerHTML = `Name: ${this.placeholderAsset.nameFull}&nbsp;Symbol: ${this.placeholderAsset.symbol}&nbsp;Amount: ${this.placeholderAsset.amount}&nbsp;Basic Price: ${this.placeholderAsset.basicPrice} $&nbsp; - &nbsp;`;
    nextItem.setAttribute(`id`, `${this.placeholderAsset.symbol}`);
    nextItem.setAttribute(`name`, `${this.placeholderAsset.nameFull}`);
    nextItem.appendChild(nextItemButton);

    return  document.getElementById('output').appendChild(nextItem);
  };

  removeItem(e){
    var removeAsset = e.target.parentNode;
    removeAsset.remove();

  }
}
