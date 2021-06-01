const express = require('express');
const bodyParser = require('body-parser');
const Asset = require('./models/asset');
const mongoose = require('mongoose');

const app = express();

// connection with database
mongoose.connect('mongodb://127.0.0.1:27017/invKeepDatabase?retryWrites=true&w=majority&compressors=zlib&gssapiServiceName=mongodb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('\x1b[32m', 'Connected to MongoDB database!');
    })
    .catch(($e) => {
        console.log('\x1b[31m', `Connection to MongoDB database failed! Error: ${$e}`);
    });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// set all needed headers for every response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
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
    })
    singleAsset.save()
        .then((addedAsset) => {
            console.log('\x1b[32m', 'Asset added correctly!');
            res.status(201).json({
                message: 'Asset added successfully!',
                assetId: addedAsset._id
            })
        })
        .catch(($e) => {
            console.log('\x1b[31m', `Asset addition failed! Error: ${$e}`);
        })
})

app.get('/api/assets', (req, res) => {
    Asset.find()
        .then((documents) => {
            res.status(200).json({
                message: 'Asset list returned successfully!',
                payload: documents
            });
        })
});

app.put('/api/assets', (req, res) => {
    Asset.find({id: req.body.id}, assetSearch => {
        console.log(assetSearch)
        if (req.body.id === assetSearch.id) {
            let updatedAsset = {
                id: req.body.id,
                assetName: req.body.assetName,
                assetSymbol: req.body.assetSymbol,
                amount: req.body.amount,
                buyPrice: req.body.price,
                currency: req.body.currency,
                purchaseDate: req.body.date
            }
            Asset.updateOne(req.body._id, updatedAsset);
        }
    }).then((updatedAsset) => {
        res.status(200).json({
            message: 'Asset updated successfully!',
            payload: updatedAsset
        })
    })
})

app.delete('/api/delete/:id', (req, res) => {
    Asset.deleteOne({_id: req.params.id}).then((done) => {
        res.status(200).json(done);
    })
        .catch($e => {
            console.log('Error with asset deletion. Error: ' + $e);
        })
})

module.exports = app;
