export interface AssetRecord {
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number,
  currency: string,
  purchaseDate: Date | string
}

export var AssetCurrency: {name: string, symbol: string}[] = [
  {name: `dollar`, symbol: `$`},
  {name: `euro`, symbol: `€`},
  {name: `pound`, symbol: `£`},
  {name: `yen`, symbol: `¥`}
]
