const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const cryptoInfo = require('../controllers/cryptoInfo');
const walletInfo = require('../controllers/walletInfo');

//  Placeholder API
router.get('/convert_currency', cryptoInfo);
router.get('/wallet', walletInfo);

module.exports = router;