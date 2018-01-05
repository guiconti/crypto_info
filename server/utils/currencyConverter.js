/**
 * Convert a currency to another
 * @module utils/currencyConverter
*/

const request = require('request');
const constants = require('./constants');

/**
 * Convert a currency to another
 *
 * @param {string} fromCurrency - Currency to be converted
 * @param {string} toCurrency - Currency to convert to
 * @return {object} - Returns information about the currency converted
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/

module.exports = (fromCurrency, toCurrency) => {
  return new Promise((resolve, reject) => {
    const currencyExchangeUrl = constants.urls.BITTREX_CURRENCY_EXCHANGE_PREFIX + fromCurrency + 
      '-' + toCurrency;
    request.get({url: currencyExchangeUrl}, (err, httpResponse, body) => {
      if (err)
        return reject(err);
      let currencyExchangeInfo = JSON.parse(body);
      const finalCurrencyUrl = constants.urls.BTC_INFO;
      request.get({url: finalCurrencyUrl}, (err, httpResponse, body) => {
        if (err)
          return reject(err);
        let finalCurrencyInfo = JSON.parse(body);
        let currencyInfo = {
          currencyConverted: currencyExchangeInfo.result[0].Bid,
          finalCurrencyValue: finalCurrencyInfo.bpi.USD.rate_float
        };
        return resolve(currencyInfo);
      });
    });
  });
}