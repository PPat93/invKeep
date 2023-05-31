import MainPage from "../../../support/pageObjectModel/pageObjects/MainPage";
import AnalysisPageConsts from "../../../support/pageObjectModel/Utils/AnalysisPageConsts";
import Utils, { AssetCurrency } from "../../../support/pageObjectModel/Utils/Utils";

describe(`File upload`, () => {

    let assetName: string = ``;

    let correctFileNames: string[] = [`testImg.png`, `testImg2.jpg`, `testImg3.jpeg`];
    let upperLowerExtensions: string[] = [`testImg.pNg`, `testImg2.JpG`, `testImg3.JPEG`];
    let wrongTypeFileNames: string[] = [`exeFile.exe`, `txtFile.txt`, `pdfFile.pdf`, `xlsFile.xls`, `mp3File.mp3`, `csvFile.csv`, `zipFile.zip`];
    let disguisedFiles: string[] = [`csvPretendingjJPG.jpg`, `pdfPretendingJPEG.jpeg`, `txtPretendingPNG.png`];
    let wrongImageFiles: string[] = [`bmpFile.bmp`, `icoImage.ico`, `rasterImage.ora`, `tifImage.tif`];
    let extensionlessFiles: string[] = [`extensionlessImage`, `extensionlessNonImage`];

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

            let splitFileNameArr: string[] = singleFile.toLowerCase().split(`.`);
            splitFileNameArr[1] = (splitFileNameArr[1] === `jpg`) ? `jpeg` : splitFileNameArr[1];

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
                expect(intercept.response.body.imgPath).contains(splitFileNameArr[0]).and.contains(splitFileNameArr[1]);
            })
        })
    })

    correctFileNames.forEach(singleFile => {
        it(`Ratios Analysis - Correct file upload - Image visibilities - ${singleFile}`, () => {

            let retrievedExtension: string = singleFile.split(`.`)[length + 1];

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
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .assertImageSize(`imageFileUpload/valid/${singleFile}`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);

            cy.reload();

            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .should(`be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .assertImageSize(`imageFileUpload/valid/${singleFile}`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
                .assertImageExtension(retrievedExtension);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
                .should(`not.exist`);
        })
    })

    upperLowerExtensions.forEach(singleFile => {
        it(`Ratios Analysis - Correct file upload - Accept upper/lower case extensions ${singleFile}`, () => {

            let splitFileNameArr: string[] = singleFile.toLowerCase().split(`.`);
            splitFileNameArr[1] = (splitFileNameArr[1] === `jpg`) ? `jpeg` : splitFileNameArr[1];

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
                expect(intercept.response.body.imgPath).contains(splitFileNameArr[0]).and.contains(splitFileNameArr[1]);
            })
        })
    })

    wrongTypeFileNames.forEach((singleFile, index) => {
        it(`Ratios Analysis - Incorrect file upload attempt - Wrong extension files , no file attaching - ${singleFile}`, () => {

            //  Arrange & Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/invalid/wrongType/${singleFile}`, { force: true });

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

    wrongImageFiles.forEach(singleFile => {
        it(`Ratios Analysis - Incorrect file upload attempt - Invalid image file type - ${singleFile}`, () => {

            //  Arrange & Act
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/invalid/wrongImageType/${singleFile}`, { force: true });

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
        cy.getDataCyElement(AnalysisPageConsts.fileUploadRetrievedImage)
            .assertImageSize(`imageFileUpload/valid/testImg.png`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
            .should(`not.exist`);

    })

    it(`Ratios Analysis - Correct file overwrite upload - Correct file retrieval after file overwritting`, () => {

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
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/valid/testImg2.jpg`, { force: true });
        cy.intercept(`POST`, `images`).as(`fileOverwrite`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .click();

        cy.wait(`@fileOverwrite`).then(intercept => {
            expect(intercept.response.statusCode).equal(201);
            Cypress.env(`assetFile`).set(`fileOverwrite`, intercept.response.body.imgPath);
            expect(Cypress.env(`assetFile`).get(assetName)).not.equal(Cypress.env(`assetFile`).get(`fileOverwrite`));
        })
        Utils.visitPage(Utils.mainPageUrl);
        cy.getDataCyElement(MainPage.dataCyElementAsset(assetName))
            .click();
        cy.intercept(`GET`, `images`).as(`fileRetrieval`);
        cy.getDataCyElement(MainPage.dataCyElementDetailsBtn(assetName))
            .click();

        //  Assert
        cy.wait(`@fileRetrieval`).then(intercept => {
            expect(intercept.response.statusCode).equal(200);
            Cypress.env(`assetFile`).set(`fileRetrieval`, intercept.response.body.imgPath);
            expect(Cypress.env(`assetFile`).get(assetName)).not.equal(Cypress.env(`assetFile`).get(`fileRetrieval`));
            expect(Cypress.env(`assetFile`).get(`fileOverwrite`)).be.equal(Cypress.env(`assetFile`).get(`fileRetrieval`));
        })
    })

    it(`Ratios Analysis - Correct file reupload after upload attempt - No file attaching`, () => {

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
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/valid/testImg.png`, { force: true });

        //  Assert
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .assertImageSize(`imageFileUpload/valid/testImg.png`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
            .should(`not.exist`);
    })

    it(`Ratios Analysis - Correct file reupload after page reload - Correct request send`, () => {

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
        cy.reload();
        cy.intercept(`POST`, `images`).as(`fileReuploadRequest`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/valid/testImg.png`, { force: true });
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .click();

        //  Assert
        cy.wait(`@fileReuploadRequest`).then(intercept => {
            expect(intercept.response.statusCode).equal(201);
            expect(intercept.response.body).have.property(`message`, `File uploaded successfully.`);
            expect(intercept.response.body.imgPath).contains(`testimg`).and.contains(`png`);
        })
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .assertImageSize(`imageFileUpload/valid/testImg.png`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
            .should(`not.exist`);
    })

    it(`Ratios Analysis - Incorrect file upload - Too heavy file (over 2MB)`, () => {

        //  Arrange & Act 
        cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
            .selectFile(`cypress/fixtures/imageFileUpload/invalid/testImgOver2mb.jpg`, { force: true });

        //  Assert
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
            .should(`be.visible`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
            .should(`not.exist`);
        cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
            .should(`not.exist`);
    })

    extensionlessFiles.forEach(singleFile => {
        it(`Ratios Analysis - Incorrect file upload attempt - Extensionless file upload - ${singleFile}`, () => {

            //  Arrange & Act 
            cy.getDataCyElement(AnalysisPageConsts.fileUploadInputHidden)
                .selectFile(`cypress/fixtures/imageFileUpload/invalid/extensionlessImage`, { force: true });

            //  Assert
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSelectFileBtn)
                .should(`be.visible`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadImagePreview)
                .should(`not.exist`);
            cy.getDataCyElement(AnalysisPageConsts.fileUploadSaveButton)
                .should(`not.exist`);
        })
    })

    // TODO - 1 - not urgent - to be created after functionality is developed
    it.skip(`Ratios Analysis - Incorrect file upload attempt - Too big dimensions`, () => { })
    it.skip(`Ratios Analysis - Incorrect file upload attempt - Invalid name chars`, () => { })
    it.skip(`Ratios Analysis - Incorrect file upload attempt - Too long file name`, () => { })
})
