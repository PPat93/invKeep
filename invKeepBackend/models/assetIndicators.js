const mongoose = require('mongoose');

const assetIndicatorsSchema = new mongoose.Schema({
    assetId: {
        type: String
    },
    EPSRatio: {
        type: Number
    },
    PERatio: {
        type: Number
    },
    PEGRatio: {
        type: Number
    },
    CAPERatio: {
        type: Number
    },
    PBRatio: {
        type: Number
    },
    DERatio: {
        type: Number
    },
    ROE: {
        type: Number
    },
    ROCERatio: {
        type: Number
    },
    DividendYield: {
        type: Number
    },
    DPRRatio: {
        type: Number
    },
    PSRatio: {
        type: Number
    },
    GrahamNum: {
        type: Number
    },
    EVtoEBITRatio: {
        type: Number
    },
    EVtoEBITDA: {
        type: Number
    }
});

module.exports = mongoose.model('assetIndicatorsSchema', assetIndicatorsSchema);