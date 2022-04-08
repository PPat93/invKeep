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

export interface AssetRatiosValues {
  assetId: string,
  ratiosArray: { parameterName: string, valueNum: number, unit: string }[]
}
// TODO clean up below AssetAndIndicatorsAnlysis and AnalyzedData interfaces that are probably redundant
export interface AssetAndIndicatorsAnlysis {
  assetId: string,
  ratiosArray: { parameterName: string, valueNum: number, unit: string }[],
  analyzedData: {
    coanalysis: string[],
    shortDescription: string,
    intervals: {
      name: string,
      numberRating: number,
      summary: string,
      verbalRating: string
    },
    name: string,
    bulletPointSummary: string[],
    value: number
  }[]
}

export interface AnalyzedData {
  coanalysis: string[],
  shortDescription: string,
  intervals: {
    name: string,
    numberRating: number,
    summary: string,
    verbalRating: string
  },
  name: string,
  bulletPointSummary: string[],
  value: number
}

export let welcomeMsg = {
  "title": "Welcome!",
  "msg": "I'm glad you chose invKeep to keep your assets and analyze them (in the future). App is intuitive, simple and I will do my best to keep it like that."
};
