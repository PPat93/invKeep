import Utils from "./../Utils/Utils"
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
    //  FILE UPLOAD -----------------------------------------------------------------------------------------------------------------------
    readonly fileUploadSection = `file-upload-section`;
    readonly fileUploadCellDescription = `file-upload-cell-description`;
    readonly fileUploadCellUpload = `file-upload-cell-upload`;
    readonly fileUploadCellSave = `file-upload-cell-save`;
    readonly fileUploadInputHidden = `file-upload-input-hidden`;
    readonly fileUploadRetrievedImage = `file-upload-retrieved-img`;
    readonly fileUploadSelectFileBtn = `file-upload-select-file-button`;
    readonly fileUploadImagePreview = `file-upload-image-prv`;
    readonly fileUploadSaveButton = `file-upload-save-img-button`;

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
    readonly detailsButtonClass = `.details-button`;
    ratioDetailsButton(ratioName: string) {
        return `${Utils.sanitizeRatioName(ratioName)}-details-button`;
    }

    //-------------------------------------------------------------------------------------------------------------------------------------
    //  RATIO DETAILS DIALOG --------------------------------------------------------------------------------------------------------------
    readonly dialogHeaderClass = `.ratio-name-header-dialog`;
    ratioDetailsDialog(ratioName: string) {
        return `${Utils.sanitizeRatioName(ratioName)}-ratio-details-dialog`;
    };

    readonly dialogCloseButton = `close-dialog-button`;

    readonly dialogShortDescriptionTitle = `short-description-title`;
    readonly dialogShortDescriptionText = `short-description-text`;

    readonly dialogExtensiveDescriptionTitle = `extensive-description-title`;
    readonly dialogExtensiveDescriptionText = `extensive-description-text`;

    readonly dialogBulletSummaryTitle = `bullet-point-summary-title`;
    readonly dialogBulletPointItemClass = `.bullet-point-summary-content-item`;

    readonly dialogIntervalTextItemClass = `intervals-bulletpoint-text`;

    getDialogBulletItem(itemIndex: number) {
        return cy.getDataCyElement(`single-bullet-item-${itemIndex}`);
    }

    readonly dialogIntervalsTitle = `intervals-title`;
    getDialogIntervalItem(itemIndex: number) {
        return cy.getDataCyElement(`single-interval-item-${itemIndex}`);
    }

    readonly dialogCoanalysisTitle = `coanalysis-title`;
    getDialogCoAnalysisItem(itemIndex: number) {
        return cy.getDataCyElement(`single-coanalysis-item-${itemIndex}`);
    }

    readonly dialogFormulaTitle = `formula-title`;

    readonly dialogUsageExampleTitle = `usage-example-title`;
    readonly dialogUsageExampleText = `usage-example-text`;

    //-------------------------------------------------------------------------------------------------------------------------------------

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  TEXTS                       ////////////////////////////////////////////////////////////////////////////////////////////////////////

}

export default new AnalysisPageConsts();