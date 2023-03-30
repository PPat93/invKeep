import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`Analysis Ratios saving`, () => {

    let assetName: string = ``;
    let correctFileExtensions = [`png`, `jpg`, `jpeg`];
    let fileNames = [`testImg.${correctFileExtensions[0]}`, `testImg2.${correctFileExtensions[1]}`, `testImg3.${correctFileExtensions[2]}`];

    beforeEach(`Create test asset`, () => {

        assetName = `TestAsset${Date.now()}`;

        cy.apiCreateAsset(assetName, `TASbl`, 19, 245.5, AssetCurrency.euro);
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();
    });

    afterEach(`Little teardown`, () => {
        Utils.teardownAssets(`TestAsset`);
    })

    fileNames.forEach((singleFile, index) => {
        it(`Ratios Analysis - Correct file upload - *.${correctFileExtensions[index]} extension`, () => {

            //  Arrange 
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/valid/${singleFile}`, { force: true });
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`be.visible`);
            cy.intercept(`POST`, `images`).as(`fileUploadRequest`);

            // Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .click();

            //  Assert
            cy.wait(`@fileUploadRequest`).then(intercept => {
                expect(intercept.response.statusCode).equal(201);
                expect(intercept.response.body).have.property(`message`, `File uploaded successfully.`);
                expect(intercept.response.body).have.property(`imgPath`);

            })
            
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);

        })
    })
})