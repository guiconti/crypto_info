const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const cryptoInfo = require('../controllers/cryptoInfo');

//  Placeholder API
router.get('/info', cryptoInfo);

module.exports = router;