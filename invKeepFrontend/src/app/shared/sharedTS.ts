export interface AssetRecord {
  _id: string,
  id: string,
  assetName: string,
  assetSymbol: string,
  amount: number,
  buyPrice: number,
  currency: string,
  purchaseDate: Date | string
}

export interface DetailedAssetRatios {
  assetId: string,
  ratiosArray: { parameterName: string, valueNum: number, unit: string}[]
}

export interface DetailedAssetRatiosAnalyzed {
  assetId: string,
  ratiosArray: { parameterName: string, valueNum: number, unit: string}[],
  analyzedData: {
    coanalysis: string[],
    description: string,
    intervals: {
      name: string,
      numberRating: number,
      summary: string,
      verbalRating: string
    },
    name: string,
    shortly: string[],
    value: number
  }[]
}

export interface AnalyzedData {
  coanalysis: string[],
  description: string,
  intervals: {
    name: string,
    numberRating: number,
    summary: string,
    verbalRating: string
  },
  name: string,
  shortly: string[],
  value: number
}

export let welcomeMsg = {
  "title": "Welcome!",
  "msg": "I'm glad you chose invKeep to keep your assets and analyze them (in the future). App is intuitive, simple and I will do my best to keep it like that."
};
