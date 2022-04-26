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
export interface AssetAndIndicatorsAnlysis extends AssetRatiosValues {
  analyzedData: {
    coAnalysis: string[],
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
  coAnalysis: string[],
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

export interface RatioInfoObject {
  name: string,
  coAnalysis: string[],
  shortDescription: string,
  extensiveDescription: string,
  formula: string,
  example: string,
  bulletPointSummary: string[],
  intervals: {
    data: {
      name: string,
      numberRating: number,
      summary: string,
      verbalRating: string
    }[],
    values: number[][]
  },
};

export let welcomeMsg = {
  "title": "Welcome!",
  "msg": "I'm glad you chose invKeep to keep your assets and analyze them (in the future). App is intuitive, simple and I will do my best to keep it like that."
};
