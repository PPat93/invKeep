export interface AssetRecord {
  id: string,
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number,
  currency: string,
  purchaseDate: Date | string
}

export interface DetailedAssetRatios{
  id: string,
  EPSRatio: number,
  PERatio: number,
  PEGRatio: number,
  CAPERatio: number,
  PBRatio: number,
  DERatio: number,
  ROE: number,
  ROCERatio: number,
  DividendYield: number,
  DPRRatio: number,
  PSRatio: number,
  GrahamNum: number,
  EVtoEBITRatio: number,
  EVtoEBITDA: number
}

export let welcomeMsg = {
  "title": "Welcome!",
  "msg": "I'm glad you chose invKeep to keep your assets and analyze them (in the future). App is intuitive, simple and I will do my best to keep it like that."
};
