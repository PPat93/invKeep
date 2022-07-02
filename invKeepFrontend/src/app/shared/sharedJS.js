////////////////////////   CONSTS   /////////////////////////////////////////////////////

const RatiosNames = Object.freeze({
  eps_ratio: 'EPS Ratio',
  pe_ratio: 'P/E Ratio',
  peg_ratio: 'PEG Ratio',
  cape_ratio: 'CAPE Ratio',
  pb_ratio: 'P/B Ratio',
  de_ratio: 'D/E Ratio',
  roe_ratio: 'ROE Ratio',
  roce_ratio: 'ROCE Ratio',
  dividend_yield: 'Dividend Yield',
  dpr_ratio: 'DPR Ratio',
  ps_ratio: 'P/S Ratio',
  graham_num: 'Graham Number',
  ev_ebit_ratio: 'EV/EBIT Ratio',
  ev_ebitda_ratio: 'EV/EBITDA Ratio'
});

const RatiosUnits = Object.freeze({
  percentage: '%',
  unitless: '-',
  currency: 'curr'
});

const RatingObject = Object.freeze({
  undetermined: 'Undetermined', // 0
  error: 'Error', // 0
  depends: 'Depends', // 3
  terrible: 'Terrible', // 1
  rather_bad: 'Rather bad', // 2
  neutral: 'Neutral', // 3
  ok: 'OK', // 4
  rather_good: 'Rather good', // 5
  outstanding: 'Outstanding' // 6
});

////////////////////////   FUNCTIONS   /////////////////////////////////////////////////////

function searchObject(ratiosArray, searchedNameObj) {
  for (let a = 0; a < ratiosArray.length; a++) {
    if (ratiosArray[a].parameterName === searchedNameObj) {
      return ratiosArray[a];
    }
  }
}

module.exports = { RatiosNames, searchObject, RatingObject, RatiosUnits };