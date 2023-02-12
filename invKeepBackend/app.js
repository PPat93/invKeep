const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const assetRoutes = require('./routes/assets');
const ratiosAnalysisRoutes = require('./routes/ratiosAnalysis');
const ratiosDetailsRoutes = require('./routes/ratiosDetails');

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

app.use(express.json());

//  middleware that will take all requests with '/imageFiles' path (if nothing preceedes it) and allows it an access to a .../invKeepBackend/imageFiles 
//  directory only for retrieving files
app.use("/imageFiles", express.static(path.join(__dirname + "/imageFiles")));

// set all needed headers for every response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/api/assets', assetRoutes);
app.use('/api/ratio-analysis', ratiosAnalysisRoutes);
app.use('/api/ratio-details', ratiosDetailsRoutes);

module.exports = app;
