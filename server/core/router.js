const express = require('express');
const bodyParser = require('body-parser');
const constants = require('../utils/constants');

const router = express.Router();
router.use(bodyParser.json());

const middleware = require('../controllers/middleware');
router.use(middleware);

const registerWallet = require('../controllers/registerWallet');

const cryptoInfo = require('../controllers/cryptoInfo');
const walletBalance = require('../controllers/walletBalance');
const walletCoinBalance = require('../controllers/walletCoinBalance');
const walletTimeline = require('../controllers/walletTimeline');

const generateApiKey = require('../controllers/generateApiKey');

//  Internal APIs
router.post('/wallet/register', registerWallet);

//  Kucoin APIs (TODO: Make it accept any coded exchange)
router.get('/convert_currency', cryptoInfo);
router.get('/:userId/wallet/balance', walletBalance);
router.get('/:userId/wallet/:coin/balance', walletCoinBalance);
router.get('/:userId/wallet/timeline', walletTimeline);
//router.post('/create_api_key', generateApiKey);

//  Server static folder with graphs
router.use('/graphs', express.static(constants.paths.GRAPHS_PATH));

module.exports = router;