/**
 * Get crypto currrency values
 * @module controllers/cryptoValue
*/

const request = require('request');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

/**
 * Get a crypto currency buy and sell value
 *
 * @param {object} req.body - User data
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  let {cryptoCurrency, currency} = req.body;

  if (validator.isValidString(cryptoCurrency)){
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CRYPTO_CURRENCY
    });
  }
  if (validator.isValidString(currency)){
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CURRENCY
    });
  }

};
