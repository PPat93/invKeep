const express = require('express');
const mongoose = require('mongoose');

const assetRoutes = require('./routes/assets');
const detailedRatiosRoutes = require('./routes/detailedRatios');

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

// set all needed headers for every response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use('/api/assets', assetRoutes);
app.use('/api/detailed-ratios', detailedRatiosRoutes);

module.exports = app;
