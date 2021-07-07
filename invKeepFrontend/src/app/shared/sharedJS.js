const RatiosNames = Object.freeze({
  eps_ratio: `EPS Ratio`,
  pe_ratio: `P/E Ratio`,
  peg_ratio: `PEG Ratio`,
  cape_ratio: `CAPE Ratio`,
  pb_ratio: `P/B Ratio`,
  de_ratio: `D/E Ratio`,
  roe_ratio: `ROE Ratio`,
  roce_ratio: `ROCE Ratio`,
  dividend_yield: `Dividend Yield`,
  dpr_ratio: `DPR Ratio`,
  ps_ratio: `P/S Ratio`,
  graham_num: `Graham Number`,
  ev_ebit_ratio: `EV/EBIT Ratio`,
  ev_ebitda_ratio: `EV/EBITDA Ratio`
});

function searchObject(ratiosArray, searchedNameObj) {
  for (let a = 0; a < ratiosArray.length; a++) {
    if (ratiosArray[a].parameterName === searchedNameObj) {
      return ratiosArray[a];
    } else {
      return null;
    }
  }
}

module.exports = {RatiosNames, searchObject};
