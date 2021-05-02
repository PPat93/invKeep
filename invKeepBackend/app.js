const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.use('/api/assets', (req, res, next) => {
    const assets = [
        {
            id: 1,
            assetName: 'Comerica',
            assetSymbol: 'CMA',
            amount: 12,
            buyPrice: 58.56,
            currency: '€',
            purchaseDate: '12/11/2019'
        },
        {
            id: 2,
            assetName: 'Nio',
            assetSymbol: 'NIO',
            amount: 325,
            buyPrice: 12.13,
            currency: '$',
            purchaseDate: '22/12/2020'
        }
    ]
    res.json({
        message: 'Asset list returned successfully!',
        payload: assets
    });
});

module.exports = app;
