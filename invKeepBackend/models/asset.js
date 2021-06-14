const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    assetName: {
        type: String,
        required: true
    },
    assetSymbol: {
        type: String,
        uppercase: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String  // for some reason if Date type is added - instead 2021-05-14 there is 2021-05-13 displayed.
        // Probably when conversion from string to Date is performed - to be investigated.
    }
}, {collection: 'assets'});

module.exports = mongoose.model('Asset', assetSchema);