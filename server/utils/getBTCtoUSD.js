/**
 * Get BTC value in USD
 * @module utils/getBTCtoUSD
*/

const validator = require('../utils/validator');
const constants = require('../utils/constants');
const request = require('request');
const logger = require('../../tools/logger');

/**
 * Get a crypto currency buy and sell value
 *
 * @param {object} req.body - User data
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = () => {
  return new Promise((resolve, reject) => {
    request.get(constants.urls.BTC_INFO, {}, (err, httpResponse, body) => {
      if (err)
        return reject(err);
      let BTCInfo = JSON.parse(body);
      return resolve(BTCInfo.bpi.USD.rate_float);
    });
  });
};
