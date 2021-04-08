import { Component } from '@angular/core';

@Component ({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})

export class AssetListComponent{

  assetArray: assetRecord[] = [
    {assetName: `Comerica`, assetSymbol:`CMA`, amount: 12, buyPrice: 58.2},
    {assetName: `Apple`, assetSymbol:`AAPL`, amount: 2, buyPrice: 304.22},
    {assetName: `Chesapeak Energy`, assetSymbol:`CHK`, amount: 125, buyPrice: 0.45},
    {assetName: `Nio`, assetSymbol:`NIO`, amount: 5, buyPrice: 12.47}
]
  ngOnInit(): void{

  }

}

export type assetRecord = {
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number
}
