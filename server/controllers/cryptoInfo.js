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
  const currencyExchangeUrl = constants.urls.BITTREX_CURRENCY_EXCHANGE_PREFIX + fromCurrency.trim() + 
    '-' + toCurrency.trim();
  request.get({url: currencyExchangeUrl}, (err, httpResponse, body) => {
    if (err)
      return res.status(500).json({
        msg: constants.messages.error.ACCESS_BLOCKCHAIN_INFO
      });
    let currencyExchangeInfo = JSON.parse(body);
    const finalCurrencyUrl = constants.urls.BTC_INFO;
    request.get({url: finalCurrencyUrl}, (err, httpResponse, body) => {
      if (err)
        return res.status(500).json({
          msg: constants.messages.error.ACCESS_BLOCKCHAIN_INFO
        });
      let finalCurrencyInfo = JSON.parse(body);
      let currencyExchangeValue = currencyExchangeInfo.result[0].Bid;
      let finalCurrencyBuyValue = finalCurrencyInfo.bpi.USD.rate_float;
      return res.status(200).json({
        msg: currencyExchangeValue * finalCurrencyBuyValue
      });
    });
  });
};
