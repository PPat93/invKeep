export interface AssetRecord {
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
  ratiosArray: { parameterName: string, valueNum: number }[]
}

export enum RatiosNames {
  eps_ratio = `EPS Ratio`,
  pe_ratio = `P/E Ratio`,
  peg_ratio = `PEG Ratio`,
  cape_ratio = `CAPE Ratio`,
  pb_ratio = `P/B Ratio`,
  de_ratio = `D/E Ratio`,
  roe_ratio = `ROE Ratio`,
  roce_ratio = `ROCE Ratio`,
  dividend_yield = `Dividend Yield`,
  dpr_ratio = `DPR Ratio`,
  ps_ratio = `P/S Ratio`,
  graham_num = `Graham Number`,
  ev_ebit_ratio = `EV/EBIT Ratio`,
  ev_ebitda_ratio = `EV/EBITDA Ratio`
}

export let welcomeMsg = {
  "title": "Welcome!",
  "msg": "I'm glad you chose invKeep to keep your assets and analyze them (in the future). App is intuitive, simple and I will do my best to keep it like that."
};
