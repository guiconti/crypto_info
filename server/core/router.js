const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const registerWallet = require('../controllers/registerWallet');

const cryptoInfo = require('../controllers/cryptoInfo');
const walletBalance = require('../controllers/walletBalance');
const walletCoinBalance = require('../controllers/walletCoinBalance');

//  Internal APIs
router.post('/wallet/register', registerWallet);

//  Kucoin APIs (TODO: Make it accept any coded exchange)
router.get('/convert_currency', cryptoInfo);
router.get('/:userId/wallet/balance', walletBalance);
router.get('/:userId/wallet/:coin/balance', walletCoinBalance);

module.exports = router;