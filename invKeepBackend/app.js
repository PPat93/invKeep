const express = require('express');
const bodyParser = require('body-parser');
const Asset = require('./models/asset');

const app = express();

let assetList = [];

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/assets',(req, res, next) => {
    const singleAsset = new Asset({
        id: req.body.id,
        assetName: req.body.assetName,
        assetSymbol: req.body.assetSymbol,
        amount: req.body.amount,
        buyPrice: req.body.buyPrice,
        currency: req.body.currency,
        purchaseDate: req.body.purchaseDate
    })
    console.log(singleAsset);
    assetList.push(singleAsset);
    res.status(201).json({
        message: 'Asset added successfully!'
    })
})

app.get('/api/assets', (req, res, next) => {

    res.status(200).json({
        message: 'Asset list returned successfully!',
        payload: assetList
    });
});

module.exports = app;
