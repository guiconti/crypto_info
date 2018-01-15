const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const middleware = require('../controllers/middleware');
router.use(middleware);

const registerWallet = require('../controllers/registerWallet');

const cryptoInfo = require('../controllers/cryptoInfo');
const walletBalance = require('../controllers/walletBalance');
const walletCoinBalance = require('../controllers/walletCoinBalance');

const generateApiKey = require('../controllers/generateApiKey');

//  Internal APIs
router.post('/wallet/register', registerWallet);

//  Kucoin APIs (TODO: Make it accept any coded exchange)
router.get('/convert_currency', cryptoInfo);
router.get('/:userId/wallet/balance', walletBalance);
router.get('/:userId/wallet/:coin/balance', walletCoinBalance);
//router.post('/create_api_key', generateApiKey);

module.exports = router;