import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`File upload`, () => {

    let assetName: string = ``;

    let correctFileNames = [`testImg.png`, `testImg2.jpg`, `testImg3.jpeg`];
    let incorrectFileNames = [`exeFile.exe`, `bmpFile.bmp`, `txtFile.txt`, `pdfFile.pdf`, `xlsFile.xls`, `mp3File.mp3`, `csvFile.csv`, `zipFile.zip`];
    let disguisedFiles = [`csvPretendingjJPG.jpg`, `pdfPretendingJPEG.jpeg`, `txtPretendingPNG.png`];

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

    correctFileNames.forEach(singleFile => {
        it(`Ratios Analysis - Correct file upload - ${singleFile}`, () => {

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

    correctFileNames.forEach(singleFile => {
        it(`Ratios Analysis - Correct file upload - Image visibilities - ${singleFile}`, () => {

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
        it(`Ratios Analysis - Incorrect file upload attempt - No file attaching - ${singleFile}`, () => {

            //  Arrange & Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/invalid/${singleFile}`, { force: true });

            // Assert
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .should(`not.be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .should(`not.be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);
        })
    })

    disguisedFiles.forEach(singleFile => {
        it(`Ratios Analysis - Incorrect file upload attempt - Disguised non-image file - ${singleFile}`, () => {

            //  Arrange & Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/invalid/disguised/${singleFile}`, { force: true });

            // Assert
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .should(`not.be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .should(`not.be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);
        })
    })

    it(`Ratios Analysis - Correct file upload - File retrieval after app traversal`, () => {

        //  Arrange 
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/valid/testImg.png`, { force: true });
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`be.visible`);

        cy.intercept(`POST`, `images`).as(`fileUploadRequest`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .click();

        cy.wait(`@fileUploadRequest`).then(intercept => {
            expect(intercept.response.statusCode).equal(201);
            Cypress.env(`assetFile`).set(assetName, intercept.response.body.imgPath);
        })

        //  Act
        Utils.visitPage(Utils.mainPageUrl);
        cy.get(`.mat-expansion-panel`).first()
            .click();
        cy.get(`.details`)
            .filter(`:visible`)
            .click();

        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();

        cy.intercept(`GET`, `images`).as(`fileRetrievalRequest`);
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        //  Assert
        cy.wait(`@fileRetrievalRequest`).then(interceptedData => {
            expect(interceptedData.response.statusCode).equal(200);
            expect(interceptedData.response.body.message).equal(`Asset image retrieved.`);
            expect(interceptedData.response.body.imgPath).equal(Cypress.env(`assetFile`).get(assetName));
        })
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