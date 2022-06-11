/**
 * 
 * AnalysisPageConsts class containing all consts used on invKeep create asset page
 * @class
 * 
 */
class AnalysisPageConsts {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  SELECTORS                   ////////////////////////////////////////////////////////////////////////////////////////////////////////
    readonly ratiosAnalysisCard = `ratio-analysis`;
    readonly assetRatiosInputsClass = `.single-asset-ratio`;
    
    readonly editBtn = `edit`;
    readonly saveBtn = `save`;

    //-------------------------------------------------------------------------------------------------------------------------------------
    //  INPUT TABLE -----------------------------------------------------------------------------------------------------------------------
    readonly ratiosAnalysisInputRow = `input-ratios-items-row`;
    readonly ratiosAnalysisInputTable = `ratios-input-table`;

    //  Input Cells
    readonly ratiosAnalysisInputNameCell = `input-ratios-name-cell`;
    readonly ratiosAnalysisInputValueCell = `input-ratios-value-cell`;
    readonly ratiosAnalysisInputUnitCell = `input-ratios-unit-cell`;

    //-------------------------------------------------------------------------------------------------------------------------------------
    //  ANALYSIS TABLE  -------------------------------------------------------------------------------------------------------------------
    readonly ratiosAnalysisAnalysisRow = `analysis-ratios-items-row`;
    readonly ratiosAnalysisAnalysisTable = `ratios-analysis-table`;

    //  Analysis Cells
    readonly ratiosAnalysisAnalysisNameCell = `analysis-ratios-name-cell`;
    readonly ratiosAnalysisAnalysisValueCell = `analysis-ratios-value-cell`;
    readonly ratiosAnalysisAnalysisIntervalsCell = `analysis-ratios-intervals-cell`;
    readonly intervalsCellVerbalRating = `analysis-ratios-intervals-cell-verbal-rating`;
    readonly intervalsCellSummary = `analysis-ratios-intervals-cell-summary`;
    readonly intervalsNumberRating = `analysis-ratios-intervals-cell-number-rating`;
    readonly intervalsProgressBar = `analysis-ratios-intervals-cell-progress-bar`;
    readonly ratiosAnalysisAnalysisAdditionalData = `analysis-ratios-additional-info-cell`;
    readonly additionalDataDetailsButton = `details-button`;

    //-------------------------------------------------------------------------------------------------------------------------------------
    //  RATIO DETAILS DIALOG --------------------------------------------------------------------------------------------------------------
    readonly ratioDetailsDialog = `ratio-details-dialog`;

    //-------------------------------------------------------------------------------------------------------------------------------------

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  TEXTS                       ////////////////////////////////////////////////////////////////////////////////////////////////////////

}

export default new AnalysisPageConsts();