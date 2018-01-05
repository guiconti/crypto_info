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
    const currencyExchangeUrl = constants.urls.BITTREX_CURRENCY_EXCHANGE_PREFIX + toCurrency + 
      '-' + fromCurrency;
    request.get({url: currencyExchangeUrl}, (err, httpResponse, body) => {
      if (err)
        return reject(err);
      let currencyExchangeInfo = JSON.parse(body);
      const finalCurrencyUrl = constants.urls.BTC_INFO;
      request.get({url: finalCurrencyUrl}, (err, httpResponse, body) => {
        if (err)
          return reject(err);
        let finalCurrencyInfo = JSON.parse(body);
        let currencyFullDayChange = ((currencyExchangeInfo.result[0].Bid/currencyExchangeInfo.result[0].PrevDay) - 1) * 100;
        let currencyInfo = {
          currencyConverted: currencyExchangeInfo.result[0].Bid,
          finalCurrencyValue: finalCurrencyInfo.bpi.USD.rate_float,
          currencyFullDayChange: Math.round(currencyFullDayChange * 100)/100
        };
        return resolve(currencyInfo);
      });
    });
  });
}