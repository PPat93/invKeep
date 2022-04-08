const express = require('express');
const RatiosDetails = require('../ratios/RatiosDetails');
const router = express.Router();

router.get('/:ratioName', (req, res) => {

    let retrievedInfo = new RatiosDetails(req.params.ratioName);

    res.status(200).json({

        message: req.params.ratioName + " details succesfully retrieved!",
        detailedInfos: retrievedInfo
    })
    // .catch(e => {
    //     console.log('Error during indicators saving. Error: ' + e);
    // })
});

module.exports = router;