const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Second middleware');
    next();
});

app.use((req, res, next) => {
    res.end('First response from express!');
});

module.exports = app;
