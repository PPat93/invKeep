const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

const AssetRatio = require('../models/assetRatio');
const AnalysisFilePath = require('../models/analysisFilePath');
const RatiosAnalysis = require('../ratios/AllRatios');

/*  ->  analyzeAssetProfitability determines stock ratios potential value 
*   ->  Asset item from mongoDB is passed as the function argument, so because of db returned object structure, it is needed to get ratios object 
*       that is associated with asset from another db document(which is done in newRatios variable definition) and then, on the basis of the exact 
*       ratios array, a new instance of the RatiosAnalysis class is created. After class is ready, proper analyzing method is called (with the same 
*       argument - exact ratios array) and the result is assigned to the new variable called analyzedRatios. At the end, newRatios containing ratios 
*       values and properties are combined into an array with analyzedRatios variable containing all analysis outcome for each ratio and returned 
*       for the whole method. 
*   ->  Input argument for analyzeAssetProfitability - it looks like that because of mongoDB data structure retrieval.
        [{  _id: string,
            ratiosArray: Object[]
            assetId: string, 
            __v: number
        }]
*/
function analyzeAssetProfitability(ratiosForAnalysis) {

    //  Holds the whole object containing ratios items and ids one of which is an individual object id and the other one is assetId field that is a 
    //  connection to the main asset object
    let newRatios = ratiosForAnalysis[0];

    //  Asset ratios analysis class instance creation on freshly obtained ratios array
    let RatiosClassInstance = new RatiosAnalysis(newRatios.ratiosArray);

    //  Ratios analysis class analyzing method call with an argument of the freshly obtained ratios array. The result is an array of multiple  
    //  objects (one for each ratio) containing properties of analysis outcome
    let analyzedRatios = RatiosClassInstance.analyzeData(newRatios.ratiosArray);

    //  Value returned is an array containing asset ratios object (with all data associating it to a main Asset object) and analysis outcome array
    return [newRatios, analyzedRatios];
}

//  object holding all allowed MIME types
const acceptedMimeTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

//  invalidChars holds all chars with which file will be rejected
const invalidChars = ['<', '>', ';', '\'', '\"', '&', '|', '\\', '%', '#', '*', '!'];

//  latestFileName holds latest generated file name, so it can be checked (if exists) before sending upload response
var latestFileName = '';

/*  ->  Multer storage configuration
*
*/
let storage = multer.diskStorage({

    //  The folder to which the file should be saved is defined below. Also, uploaded file invalid MIME type protection is added.
    destination: (req, file, cb) => {

        //  if isValid is undefined - that means the file MIME type was not found in allowed MIME types object and error is returned
        //  if mimeError is null, no error is returned and the proper RELATIVE path to a file save folder is returned.
        const isValid = acceptedMimeTypes[file.mimetype];
        let mimeError = null;

        //  assigns error if obtained MIME type does not exist in acceptedMimeTypes object
        if (isValid === undefined) {

            //  object returned if invalid MIME type file is uploaded to the backend
            mimeError = {
                errorType: 'mimeError',
                erorMessage: 'Error, invalid MIME type of the uploaded file.'
            }
        }

        //  if error exists, will be returned here, also if mimeError is null, then file is saved in the path provided as a second arg
        cb(mimeError, './../invKeepBackend/imageFiles');
    },

    //  filename checking code + creation of a new, unique filename before saving it in the destination above
    filename: (req, file, cb) => {

        //  if isNotValid is false, then also filenameError is null and no error is returned
        let isNotValid = false;
        let filenameError = null;

        //  iterates through invalidChars array containing invalid chars, if uploaded file name had any of invalid chars, isNotValid is set to true
        invalidChars.forEach(singleChar => {
            if (file.originalname.includes(singleChar))
                isNotValid = true;
        })

        //  assigns error object if any of forbidden chars was included into filename
        if (isNotValid)

            //  object returned if uploaded file contain any of the forbidden chars
            filenameError = {
                errorType: 'filenameError',
                erorMessage: 'Error, filename contains invalid chars.'
            }

        //  extraction of the correct file extension according to the MIME typeand addition it to a string after a dot
        let fileExtension = '.' + acceptedMimeTypes[file.mimetype];
        //  taking only first filename part - until first dot encountered to avoid extension duplcation. The rest does not matter, especially that unique timestamp is added.
        let shortenedName = file.originalname.split('.')[0];
        //  create new filename - first part of the filename (until first dot) is taken, spaces are replaced with dashes, all letters are becoming lower case
        //  additionally, current timestamp is added so filename will be surely unique, at the end the dot and proper file extension is added.
        let newFileName = shortenedName.replaceAll(' ', '-').toLowerCase() + Date.now() + fileExtension;
        //  assigning the latest file name to a global latestFileName variable, so it will be used as anargument during checking if file exists and if was properly saved
        latestFileName = newFileName;

        //  if error exists, will be returned here, also if filenameError is null, then the file is saved with the name provided as newFileName
        cb(filenameError, newFileName);
    }
})

//  ROUTES
//  Asset ratios
router.get('/:id', (req, res) => {
    AssetRatio.find({ assetId: req.params.id }).then((ratiosForAnalysis) => {

        //  After import in Linux got an error here: "Error during ratio analysis retrieval. Error: TypeError: Cannot read properties of undefined (reading 'valueNum')"
        //  Analysis results -> for some reason, ratiosArray array that is inside each imported object may be wrapped with string during import to a database:
        //  [{
        //       _id: 61fbc950679d1b4014972f03,
        //       __v: 0,
        //       assetId: '61fbc950679d1b4014972f02',
        //       ratiosArray: [ [Object] ]   ---->      this becomes    ---->   ratiosArray: "[ [Object] ]" 
        //  }]
        //  Therefore, inside AllRatios class constructor - the array, that should be searched through with sharedJS.js file searchObject method is called with an
        //  argument of string chars created array (with length equal to the number of all chars of imported file). In that case, search object method does not find 
        //  appropriate name (as it is looking through single chars). Then, undefined value is returned and valueNum property is not defined and cannot be assigned
        //  during execution of class constructor. There error occurs. For the future -> make sure import was conducted correctly with appropiately exported data file

        let analyzedData = analyzeAssetProfitability(ratiosForAnalysis);

        res.status(200).json({
            message: 'Asset ratios retrieved successfully!',
            retrievedRatios: analyzedData[0],
            analyzedData: analyzedData[1]
        });
    }).catch($e => {
        console.log('Error during ratio analysis retrieval. Error: ' + $e);
    });
})

router.put('/:id', (req, res) => {
    AssetRatio.updateOne({ assetId: req.body.assetId }, req.body).then(resData => {
        AssetRatio.find({ assetId: req.body.assetId }).then(foundAssetRatios => {

            let analyzedData = analyzeAssetProfitability(foundAssetRatios);

            res.status(200).json({
                message: 'Ratios updated correctly!',
                updatedRatios: foundAssetRatios.ratiosArray,
                analyzedData: analyzedData[1]
            });
        })
    }).catch($e => {
        console.log('Error with detailed ratios save. Error: ' + $e);
    })
})

router.get('/:id/details', (req, res) => {
    AssetRatio.find({ assetId: req.params.id }).then((foundAssetRatios) => {

        let analyzedData = analyzeAssetProfitability(foundAssetRatios);

        res.status(200).json({

            message: 'Asset ratios details retrieved!',
            detailedInfos: analyzedData[1]
        });
    }).catch($e => {
        console.log('Error during indicators saving. Error: ' + $e);
    });
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Image routes                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//  get a path to an image file of an asset
router.get('/:id/images', (req, res) => {

    //  try to find a record in AnalysisFilePath that has an id of an asset requested
    AnalysisFilePath.findOne({ assetId: req.params.id }).then(foundFilePath => {

        //  if no errors occurred and a record was found, return 200OK status along with message and a path to the file
        if (foundFilePath) {
            res.status(200).json({
                message: 'Asset image retrieved.',
                imgPath: foundFilePath.filePath
            });
        } else {

            //  if no errors occurred and a record was not found, return 404 Not Found status along with a message only
            res.status(404).json({
                message: 'Asset image not found.',
                imgPath: ''
            });
        }
        //  if any error occurred, log it in server console
    }).catch($e => {
        console.log('Error during image retrieval. Error: ' + $e);
    });
})

//  define multer storage to be used + limit file size to be at maximum 2MB
var upload = multer({ storage: storage, limits: { fileSize: 2097152 } });

//  multer middleware for being called if route was requested and handle potential errors from multer diskStorage
var uploadMiddleware = function (req, res, next) {

    let multerErrorHandler = upload.single('imageFile');

    //  checking which error is encountered and return correct status
    multerErrorHandler(req, res, function (err) {

        //  below if is needed, as errorType must be checked later than err - if err is null, types inside are undefined and crashes the server
        if (err) {
            switch (err.errorType) {

                //  error with file name
                case 'filenameError':
                    res.status(422).json({
                        error: err.erorMessage
                    });
                    break;

                //  error with file MIME type
                case 'mimeError':
                    res.status(422).json({
                        error: err.erorMessage
                    });
                    break;

                default:
                    //  error if file heavier than 2 MB was uploaded
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        res.status(413).json({
                            error: 'Error, uploaded file is too heavy.'
                        });
                    } else {

                        //  default error if unexpected error happened
                        res.status(422).json({
                            error: 'The request could not be processed.'
                        });
                    }
            }
        }
        next();
    });
}

//  upload an image file
router.post('/:id/images', uploadMiddleware, (req, res, next) => {

    //  get current url address to use as a partial file path response
    let url = req.protocol + '://' + req.get('host');

    //  return 200OK only if uploaded file was correctly saved and it exists, errors are created in multer disk storage 
    //  and handled inside uploadMiddleware function
    if (fs.existsSync('./../invKeepBackend/imageFiles/' + latestFileName)) {

        //  create the newPath variable that will be used for saving new document in AnalysisFilePath collection, which will
        //  hold assetId as a string so it can be found for the right asset + filePath to retrieve the image if necessary
        let newPath = new AnalysisFilePath({
            assetId: req.params.id,
            filePath: url + '/imageFiles/' + latestFileName
        });

        //  fileUploadProcess holds value if upload was addition of a new record or an update of existing one
        let fileUploadProcess = null;

        //  isFileUploadErrorPresent indicates if an error occured during a file update/save
        let isFileUploadErrorPresent = null;

        //  check if a record with existing file path exists for the current asset
        AnalysisFilePath.findOne({ assetId: newPath.assetId }).then(foundFilePath => {

            //  if the path record exists, update it and set fileUploadProcess to update direction. Interesting thing, if there is no
            //  'then' after updateOne(), the document is not updated for some reason 
            if (foundFilePath) {
                fileUploadProcess = 'updating'
                AnalysisFilePath.updateOne({ assetId: foundFilePath.assetId }, { filePath: newPath.filePath }).then(() => {

                    // retrieval of the old file name from the saved path
                    let oldPathSplit = foundFilePath.filePath.split('/');
                    var oldFileName = oldPathSplit[oldPathSplit.length - 1];

                    //  make sure that old file exists, if so - delete it
                    if (fs.existsSync('./../invKeepBackend/imageFiles/' + oldFileName)) {

                        //  deleting old file in case of path update, so the server will not get crowded
                        fs.unlink('./../invKeepBackend/imageFiles/' + oldFileName, (err) => {
                            if (err) {
                                console.log("Error occured during deletion of " + oldFileName + " file. Error: " + err);
                            } else {
                                console.log("File " + oldFileName + " deleted successfully.");
                            }
                        });
                    }
                })
            } else {

                //  if the path record is not found, save new document in AnalysisFilePath collection and set fileUploadProcess to save direction
                fileUploadProcess = 'saving'
                newPath.save().then(() => {
                    console.log("File saved successfully.");
                });
            }
        }).catch(($e) => {

            //  If anything is wrong, error is caught and error message containing process errored is printed on the server side,
            //  additionally, isFileUploadErrorPresent is set to true, as the error ocurred 
            isFileUploadErrorPresent = true;
            console.log('\x1b[31m', `Problem with ${fileUploadProcess} file path! Error: ${$e}`);

        }).then(() => {

            //  if everything went ok and isFileUploadErrorPresent is false (no error occured), 201 Created status is returned, 
            //  along with confirmation message and a path to the saved file
            if (!isFileUploadErrorPresent) {
                res.status(201).json({
                    message: 'File uploaded successfully.',
                    imgPath: newPath.filePath
                });
            } else {

                //  if anything went wrong and an error occured during the file saving, 422 is returned, with message about an error only
                //  without the image path field
                res.status(422).json({
                    message: 'Error occured during file upload.'
                });
            }
        })
    }
})

module.exports = router;