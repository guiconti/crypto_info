/**
 * Get crypto currrency values
 * @module controllers/cryptoValue
*/

const validator = require('../utils/validator');
const constants = require('../utils/constants');
const currencyConverter = require('../utils/currencyConverter');
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
  let {fromCurrency, toCurrency} = req.query;

  if (!validator.isValidString(fromCurrency)){
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CRYPTO_CURRENCY
    });
  }
  if (!validator.isValidString(toCurrency)){
    return res.status(400).json({
      msg: constants.messages.error.INVALID_CRYPTO_CURRENCY
    });
  }
  fromCurrency = fromCurrency.trim();
  toCurrency = toCurrency.trim();
  currencyConverter(fromCurrency, toCurrency)
    .then((currencyInfo) => {
      return res.status(200).json({
        msg: `${toCurrency} is ${currencyInfo.currencyConverted} ${fromCurrency} the change in the last 24h is ${currencyInfo.currencyFullDayChange}%
The value of ${toCurrency} in USD is $${currencyInfo.currencyConverted * currencyInfo.finalCurrencyValue}`
      });
    })
    .catch(err => {
      return res.status(500).json({
        msg: constants.messages.error.ACCESS_BLOCKCHAIN_INFO
      });
    });
};
