const express = require('express');
const router = express.Router();

router.get('/:ratioName', (req, res) => {

    let retrievedInfo; // TODO to be defined
    res.status(200).json({

        message: req.params.ratioName + ' details succesfully retrieved!',
        detailedInfos: retrievedInfo
    });

// }).catch($e => {
//     console.log('Error during indicators saving. Error: ' + $e);
});

module.exports = router;