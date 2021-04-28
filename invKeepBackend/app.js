const express = require('express');
const app = express();

app.use('/api/resources', (req, res, next) => {
    const assets = [
        {
            assetName: 'Comerica',
            assetSymbol: 'CMA',
            amount: 12,
            buyPrice: 58.56,
            currency: '€',
            purchaseDate: '12/11/2019'
        },
        {
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
