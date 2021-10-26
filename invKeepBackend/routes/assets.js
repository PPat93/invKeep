
const express = require("express");
const router = express.Router();

const AllRatios = require('../ratiosCalc/AllRatios');
const EPSRatio = require('../ratiosCalc/ratiosClasses/EPSRatio');
const RatiosNames = require('../../invKeepFrontend/src/app/shared/sharedJS');

const Asset = require('../models/asset');
const AssetRatio = require('../models/assetRatio');

// Addition of a new asset, connected with rewrite it to matching mongo model pattern
router.post('', (req, res) => {
    const singleAsset = new Asset({
        id: req.body.id,
        assetName: req.body.assetName,
        assetSymbol: req.body.assetSymbol,
        amount: req.body.amount,
        buyPrice: req.body.buyPrice,
        currency: req.body.currency,
        purchaseDate: req.body.purchaseDate
    });

    const assetRatiosPlaceholder = new AssetRatio({
        id: '',
        ratiosArray: [
            { parameterName: `EPS Ratio`, valueNum: 0 },
            { parameterName: `P/E Ratio`, valueNum: 0 },
            { parameterName: `PEG Ratio`, valueNum: 0 },
            { parameterName: `CAPE Ratio`, valueNum: 0 },
            { parameterName: `P/B Ratio`, valueNum: 0 },
            { parameterName: `D/E Ratio`, valueNum: 0 },
            { parameterName: `ROE Ratio`, valueNum: 0 },
            { parameterName: `ROCE Ratio`, valueNum: 0 },
            { parameterName: `Dividend Yield`, valueNum: 0 },
            { parameterName: `DPR Ratio`, valueNum: 0 },
            { parameterName: `P/S Ratio`, valueNum: 0 },
            { parameterName: `Graham Number`, valueNum: 0 },
            { parameterName: `EV/EBIT Ratio`, valueNum: 0 },
            { parameterName: `EV/EBITDA Ratio`, valueNum: 0 }
        ]
    });

    singleAsset.save()
        .then((addedAsset) => {
            singleAsset.id = singleAsset._id;
            assetRatiosPlaceholder.assetId = singleAsset._id
            assetRatiosPlaceholder.save().then((data) => {
                console.log('\x1b[32m', 'Asset placeholder added correctly!');
            });
            singleAsset.updateOne({ id: singleAsset.id }).then(() => { // update asset id with _id created while first save
                console.log('\x1b[32m', 'Asset added correctly!');
                res.status(201).json({
                    message: 'Asset added successfully!',
                    assetId: addedAsset._id
                });
            });
        }).catch(($e) => {
            console.log('\x1b[31m', `Asset addition failed! Error: ${$e}`);
        });
});

router.get('', (req, res) => {
    Asset.find().then((documents) => {
        res.status(200).json({
            message: 'Asset list returned successfully!',
            payload: documents
        });
    });
});

router.get('/:id', (req, res) => {
    Asset.findById(req.params.id).then(foundAsset => {
        if (foundAsset)
            res.status(200).json({
                message: 'Asset found!',
                payload: foundAsset
            })
        else
            res.status(404).json({ message: 'Asset not found!' });
    })
})

router.put('/:id', (req, res) => {
    const updatedAsset = {
        id: req.body.id,
        assetName: req.body.assetName,
        assetSymbol: req.body.assetSymbol,
        amount: req.body.amount,
        buyPrice: req.body.buyPrice,
        currency: req.body.currency,
        purchaseDate: req.body.purchaseDate
    };
    Asset.updateOne({ id: req.body.id }, updatedAsset).then((updatedAsset) => {
        res.status(200).json({
            message: 'Asset updated successfully!',
            payload: updatedAsset
        });
    });
});

router.delete('/delete/:id', (req, res) => {
    Asset.deleteOne({ _id: req.params.id }).then((done) => {
        AssetRatio.deleteOne({ assetId: req.params.id }).then(() => {
            res.status(200).json(done);
        })
    }).catch($e => {
        console.log('Error with asset deletion. Error: ' + $e);
    });
});

module.exports = router;