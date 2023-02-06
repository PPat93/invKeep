const mongoose = require('mongoose');

const analysisFilePathSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
}, { collection: 'analysisFilePath' });

module.exports = mongoose.model('AnalysisFilePathSchema', analysisFilePathSchema);