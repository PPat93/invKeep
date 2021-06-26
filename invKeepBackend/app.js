const express = require('express');
const bodyParser = require('body-parser');
const Asset = require('./models/asset');
const AssetRatio = require('./models/assetRatio');
const mongoose = require('mongoose');

const app = express();

// connection with database
mongoose.connect('mongodb://127.0.0.1:27017/invKeepDatabase?retryWrites=true&w=majority&compressors=zlib&gssapiServiceName=mongodb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('\x1b[32m', 'Connected to MongoDB database!');
}).catch(($e) => {
    console.log('\x1b[31m', `Connection to MongoDB database failed! Error: ${$e}`);
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// set all needed headers for every response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

// Addition of a new asset, connected with rewrite it to matching mongo model pattern
app.post('/api/assets', (req, res) => {
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
            {parameterName: `EPS Ratio`, valueNum: 0},
            {parameterName: `P/E Ratio`, valueNum: 0},
            {parameterName: `PEG Ratio`, valueNum: 0},
            {parameterName: `CAPE Ratio`, valueNum: 0},
            {parameterName: `P/B Ratio`, valueNum: 0},
            {parameterName: `D/E Ratio`, valueNum: 0},
            {parameterName: `ROE Ratio`, valueNum: 0},
            {parameterName: `ROCE Ratio`, valueNum: 0},
            {parameterName: `Dividend Yield`, valueNum: 0},
            {parameterName: `DPR Ratio`, valueNum: 0},
            {parameterName: `P/S Ratio`, valueNum: 0},
            {parameterName: `Graham Number`, valueNum: 0},
            {parameterName: `EV/EBIT Ratio`, valueNum: 0},
            {parameterName: `EV/EBITDA Ratio`, valueNum: 0}
        ]
    });

    singleAsset.save()
        .then((addedAsset) => {
            singleAsset.id = singleAsset._id;
            assetRatiosPlaceholder.assetId = singleAsset._id
            assetRatiosPlaceholder.save().then((data) => {
                console.log('\x1b[32m', 'Asset placeholder added correctly!' + assetRatiosPlaceholder);
            });
            singleAsset.updateOne({id: singleAsset.id}).then(() => { // update asset id with _id created while first save
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

app.get('/api/assets', (req, res) => {
    Asset.find()
        .then((documents) => {
            res.status(200).json({
                message: 'Asset list returned successfully!',
                payload: documents
            });
        });
});

app.put('/api/assets/:id', (req, res) => {
    const updatedAsset = {
        id: req.body.id,
        assetName: req.body.assetName,
        assetSymbol: req.body.assetSymbol,
        amount: req.body.amount,
        buyPrice: req.body.buyPrice,
        currency: req.body.currency,
        purchaseDate: req.body.purchaseDate
    };
    Asset.updateOne({id: req.body.id}, updatedAsset).then((updatedAsset) => {
        res.status(200).json({
            message: 'Asset updated successfully!',
            payload: updatedAsset
        });
    });
});

app.delete('/api/delete/:id', (req, res) => {
    Asset.deleteOne({_id: req.params.id}).then((done) => {
        AssetRatio.deleteOne({assetId: req.params.id}).then(() => {
            res.status(200).json(done);
        })
    }).catch($e => {
        console.log('Error with asset deletion. Error: ' + $e);
    });
});

app.get('/api/detailed-ratios/:id', (req, res) => {
    AssetRatio.find({assetId: req.params.id}).then((detailedRatios) => {
        const newRatios = detailedRatios[0];
        res.status(200).json({
            message: 'Asset ratios retrieved successfully!',
            payload: newRatios
        });
    }).catch($e => {
        console.log('Error while detailed ratios retrieval. Error: ' + $e);
    });
})

app.put('/api/detailed-ratios/:id', (req, res) => {
    AssetRatio.findById(req.body.assetId).then((data) => {
        AssetRatio.updateOne({assetId: req.body.assetId}, req.body).then(resData => {
            res.status(200).json({
                message: 'Ratios updated correctly!',
                payload: resData
            });
        });
    }).catch($e => {
        console.log('Error with detailed ratios save. Error: ' + $e)
    });
});


module.exports = app;
