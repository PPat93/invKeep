const express = require('express');
const router = express.Router();

const AssetRatio = require('../models/assetRatio');
const RatiosAnalysis = require('../ratiosCalc/AllRatios');



router.get('/:id', (req, res) => {
    AssetRatio.find({ assetId: req.params.id }).then((detailedRatios) => {
        const newRatios = detailedRatios[0];
        let RatiosClassInstance = new RatiosAnalysis(newRatios.ratiosArray);

        analyzedData = RatiosClassInstance.analyzeData(newRatios.ratiosArray);

        res.status(200).json({
            message: 'Asset ratios retrieved successfully!',
            retrievedRatios: newRatios,
            analyzedData: analyzedData
        });
    }).catch($e => {
        console.log('Error while detailed ratios retrieval. Error: ' + $e);
    });
})

router.put('/:id', (req, res) => {
    AssetRatio.findById(req.body.assetId).then(() => {
        AssetRatio.updateOne({ assetId: req.body.assetId }, req.body).then(resData => {
            AssetRatio.find({ assetId: req.params.id }).then((ratios) => {
                const newRatios = ratios[0];
                let RatiosClassInstance = new RatiosAnalysis(newRatios.ratiosArray);

                analyzedData = RatiosClassInstance.analyzeData(newRatios.ratiosArray);

                res.status(200).json({
                    message: 'Ratios updated correctly!',
                    retrievedRatios: analyzedData
                });
            });
        });
    }).catch($e => {
        console.log('Error with detailed ratios save. Error: ' + $e);
    });
});

module.exports = router;