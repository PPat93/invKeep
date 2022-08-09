const express = require('express');
const router = express.Router();

const AssetRatio = require('../models/assetRatio');
const RatiosAnalysis = require('../ratios/AllRatios');

function analyzeAssetProfitability(ratiosForAnalysis) {

    let newRatios = ratiosForAnalysis[0];
    let RatiosClassInstance = new RatiosAnalysis(newRatios.ratiosArray);

    let analyzedRatios = RatiosClassInstance.analyzeData(newRatios.ratiosArray);

    return [newRatios, analyzedRatios];
}

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

// temp for experiments -> to be changed for real separate  ratios details retrieval
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

module.exports = router;