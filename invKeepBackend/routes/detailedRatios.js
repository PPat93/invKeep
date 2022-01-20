const express = require('express');
const router = express.Router();

const AssetRatio = require('../models/assetRatio');
const RatiosAnalysis = require('../ratiosCalc/AllRatios');

let RatiosClassInstance = new RatiosAnalysis();

router.get('/:id', (req, res) => {
    AssetRatio.find({ assetId: req.params.id }).then((detailedRatios) => {
        
        const newRatios = detailedRatios[0];
        
        returnAnalyzedData = RatiosClassInstance.analyzeData(newRatios.ratiosArray)
        
        res.status(200).json({
            message: 'Asset ratios retrieved successfully!',
            payload: newRatios,
            payloadData: returnAnalyzedData
        });
    }).catch($e => {
        console.log('Error while detailed ratios retrieval. Error: ' + $e);
    });
})

router.put('/:id', (req, res) => {
    AssetRatio.findById(req.body.assetId).then((data) => {
        AssetRatio.updateOne({ assetId: req.body.assetId }, req.body).then(resData => {
            RatiosAnalysis(req.body)
            res.status(200).json({
                message: 'Ratios updated correctly!',
                payload: resData
            });
        });
    }).catch($e => {
        console.log('Error with detailed ratios save. Error: ' + $e);
    });
});

module.exports = router;