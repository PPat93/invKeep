
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
            { parameterName: RatiosNames.RatiosNames.cape_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.de_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.dividend_yield, valueNum: 0, unit: RatiosNames.RatiosUnits.percentage },
            { parameterName: RatiosNames.RatiosNames.dpr_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.percentage },
            { parameterName: RatiosNames.RatiosNames.eps_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.currency },
            { parameterName: RatiosNames.RatiosNames.ev_ebitda_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.ev_ebit_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.graham_num, valueNum: 0, unit: RatiosNames.RatiosUnits.currency },
            { parameterName: RatiosNames.RatiosNames.pb_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.peg_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.pe_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.ps_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.unitless },
            { parameterName: RatiosNames.RatiosNames.roce_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.percentage },
            { parameterName: RatiosNames.RatiosNames.roe_ratio, valueNum: 0, unit: RatiosNames.RatiosUnits.percentage }
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