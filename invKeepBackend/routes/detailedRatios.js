const express = require('express');
const router = express.Router();

const AssetRatio = require('../models/assetRatio');
const RatiosAnalysis = require('../ratiosCalc/AllRatios');

function analyzeAssetProfitability(detailedRatios) {

    let newRatios = detailedRatios[0];
    let RatiosClassInstance = new RatiosAnalysis(newRatios.ratiosArray);

    let analyzedRatios = RatiosClassInstance.analyzeData(newRatios.ratiosArray);

    return [newRatios, analyzedRatios];
}

router.get('/:id', (req, res) => {
    AssetRatio.find({ assetId: req.params.id }).then((detailedRatios) => {

        let analyzedData = analyzeAssetProfitability(detailedRatios);

        res.status(200).json({
            message: 'Asset ratios retrieved successfully!',
            retrievedRatios: analyzedData[0],
            analyzedData: analyzedData[1]
        });
    }).catch($e => {
        console.log('Error while detailed ratios retrieval. Error: ' + $e);
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
    });
});

module.exports = router;