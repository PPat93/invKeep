const express = require('express');
const RatiosDetails = require('../ratios/RatiosDetails');
const router = express.Router();

router.get('/:ratioName', (req, res) => {

    let retrieveInfoClass = new RatiosDetails(req.params.ratioName);
    let retrievedInfo = retrieveInfoClass.getAllRatioInfo();

    res.status(200).json({

        message: retrievedInfo.name + " details succesfully retrieved!",
        detailedInfos: retrievedInfo
    })
    // .catch(e => {
    //     console.log('Error during indicators saving. Error: ' + e);
    // })
});

module.exports = router;