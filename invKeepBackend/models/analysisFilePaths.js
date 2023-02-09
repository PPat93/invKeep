const mongoose = require('mongoose');

const analysisFilePathSchema = new mongoose.Schema({
    assetId: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
}, { collection: 'analysisFilePath' });

module.exports = mongoose.model('AnalysisFilePath', analysisFilePathSchema);