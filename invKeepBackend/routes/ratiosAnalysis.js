const express = require('express');
const multer = require('multer');
const router = express.Router();

const AssetRatio = require('../models/assetRatio');
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

const acceptedMimeTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const invalidChars = ['<', '>', ';', ';', '\'', '\"', '&', '|', '\\', '%', '#', '*', '!'];

/*  ->  Multer configuration
*
*/
let storage = multer.diskStorage({

    //  The folder to which the file should be saved is defined below. Also, uploaded file invalid MIME type protection is added.
    destination: (req, file, cb) => {

        // if isValid is undefined - that means the file MIME type was not found in allowed MIME types object and error is returned
        // if mimeError is null, no error is returned and the proper RELATIVE path to a file save folder is returned.
        const isValid = acceptedMimeTypes[file.mimetype];
        let mimeError = null;

        if (isValid === undefined) {
            mimeError = new Error('Error, invalid MIME type of the uploaded file.')
        }

        cb(mimeError, 'invKeepBackend/imageFiles');
    },

    filename: (req, file, cb) => {

        let isNotValid = false;
        let filenameError = null;

        invalidChars.forEach(singleChar => {
            if (file.originalname.includes(singleChar))
                isNotValid = true;
        })

        if (isNotValid)
            filenameError = new Error('Error, filename contains invalid chars.')

        let fileExtension = '.' + acceptedMimeTypes[file.mimetype];
        let newFileName = file.originalname.replaceAll(' ', '-').toLowerCase() + Date.now() + fileExtension;

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

//  Image routes

router.get('/:id/images/:imagePath', (req, res) => {
    // AssetImage.find({ assetId: req.params.id }).then( assetImage => {

    //     res.status(200).json({

    //         message: 'Asset image retrieved!',
    //         image: 
    //     });
    // }).catch($e => {
    //     console.log('Error during image retrieval. Error: ' + $e);
    // });
})
 
router.post('/:id/images', multer(storage).single('image'), (req, res, next) => {
    console.log('received');
})
 
module.exports = router;