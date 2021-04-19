export interface AssetRecord {
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number,
  currency: string,
  purchaseDate: Date | string
}

export var AssetCurrency = {
  dollar: `$`,
  euro: `€`,
  pund: `£`,
  yen: `¥`
}
