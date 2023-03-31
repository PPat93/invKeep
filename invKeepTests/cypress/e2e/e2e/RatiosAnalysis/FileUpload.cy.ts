import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`File upload`, () => {

    let assetName: string = ``;

    let correctFileExtensions = [`png`, `jpg`, `jpeg`];
    let incorrectFileExtensions = [`exe`, `bmp`, `txt`, `pdf`, `xls`, `mp3`, `csv`];

    let correctFileNames = [`testImg.${correctFileExtensions[0]}`, `testImg2.${correctFileExtensions[1]}`,
        `testImg3.${correctFileExtensions[2]}`];
    let incorrectFileNames = [`exeFile.${incorrectFileExtensions[0]}`, `bmpImage.${incorrectFileExtensions[1]}`,
        `txtFile.${incorrectFileExtensions[2]}`, `pdfFile.${incorrectFileExtensions[3]}`,
        `xlsFile.${incorrectFileExtensions[4]}`, `mp3File.${incorrectFileExtensions[5]}`,
        `csvFile.${incorrectFileExtensions[6]}`];

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

    correctFileNames.forEach((singleFile, index) => {
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
        })
    })

    correctFileNames.forEach((singleFile, index) => {
        it(`Ratios Analysis - Correct file upload - Image visibilities *.${correctFileExtensions[index]} extension`, () => {

            //  Arrange 
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/valid/${singleFile}`, { force: true });

            cy.intercept(`POST`, `images`).as(`fileUploadRequest`);

            // Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .click();
            cy.wait(`@fileUploadRequest`).then(intercept => {
                expect(intercept.response.statusCode).equal(201);
            });

            //  Assert
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);

            cy.reload();

            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .should(`be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
                .should(`not.exist`);

        })
    })

    incorrectFileNames.forEach((singleFile, index) => {
        it(`Ratios Analysis - Inorrect file upload - *.${incorrectFileExtensions[index]} extension`, () => {

            //  Arrange 

            // Act
            
            //  Assert
            
        })
    })
})