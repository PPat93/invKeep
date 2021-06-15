const mongoose = require('mongoose');

const subDetails = new mongoose.Schema({
    parameterName: String,
    valueNum: Number
});

const assetRatioSchema = new mongoose.Schema({
    assetId: {
        type: String
    },
    ratiosArray: [subDetails]
}, {collection: 'assetRatios'});

module.exports = mongoose.model('assetRatioSchema', assetRatioSchema);