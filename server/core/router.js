const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const cryptoInfo = require('../controllers/cryptoInfo');
const walletBalance = require('../controllers/walletBalance');
const walletCoinBalance = require('../controllers/walletCoinBalance');

//  Placeholder API
router.get('/convert_currency', cryptoInfo);
router.get('/wallet/balance', walletBalance);
router.get('/wallet/:coin/balance', walletCoinBalance);

module.exports = router;