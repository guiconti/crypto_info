'use strict'

const constants = require('./constants');
const crypto = require('crypto');
const request = require('request');

/**
 * Kucoin client constructor
 * @class
 * @param {string} apiKey Your KuCoin API Key.
 * @param {string} apiSecret Your KuCoin API Secret.
 * @example
 * let kc = new Kucoin();
*/
class Kucoin {

  /**
   * You'll need to provide your KuCoin API key and secret.
   * @param {string} apiKey Your KuCoin API Key.
   * @param {string} apiSecret Your KuCoin API Secret.
  */
  constructor(_apiKey, _apiSecret) {
    this.apiKey = _apiKey;
    this.apiSecret = _apiSecret;
  }

  /**
   * Send the request to the KuCoin API, sign if authorisation is required.
   * @access private
   * @param {string} method HTTP request method, either 'get' or 'post'.
   * @param {string} path API endpoint URL suffix.
   * @param {boolean} [signed=false] Whether this endpoint requires authentiation.
   * @param {Object} params Any parameters for the request.
   * @return {Promise} An object containing the API response.
  */
  rawRequest(method, path, signed = false, params) {
    return new Promise((resolve, reject) => {
      let url = constants.urls.KUCOIN_PREFIX + path;
      let nonce = new Date().getTime();
      let queryString;
      if (params !== undefined) {
        queryString = [];
        for (let key in params) {
          queryString.push(key + '=' + params[key]);
        }
        queryString.sort();
        queryString = queryString.join('&');
      } else {
        queryString = '';
      }
      let options = {
        headers: {},
        json: true
      };
      if (signed) {
        options.headers = {
          'Content-Type': 'application/json',
          'KC-API-KEY': this.apiKey,
          'KC-API-NONCE': nonce,
          'KC-API-SIGNATURE': this.getSignature(path, queryString, nonce)
        };
      } else {
        options.headers = {
          'Content-Type': 'application/json'
        };
      }
      url += queryString;
      if (method == 'post') {
        request.post(url, options, (err, httpResponse, body) => {
          if (err)
            return reject(err);
          return resolve(body);
        });
      } else {
        request.get(url, options, (err, httpResponse, body) => {
          if (err)
            return reject(err);
          return resolve(body);
        });
      }
    });
  }

  /**
   * Generate a signature to sign API requests that require authorisation.
   * @access private
   * @param {string} path API endpoint URL suffix.
   * @param {string} queryString A querystring of parameters for the request.
   * @param {number} nonce Number of milliseconds since the Unix epoch.
   * @return {string} A string to be used as the authorisation signature.
  */
  getSignature(path, queryString, nonce) {
    let strForSign = path + '/' + nonce + '/' + queryString;
    let signatureStr = new Buffer(strForSign).toString('base64');
    let signatureResult = crypto.createHmac('sha256', this.apiSecret)
      .update(signatureStr)
      .digest('hex');
    return signatureResult;
  }

  /**
   * Do a standard public request.
   * @access private
   * @param {string} method HTTP request method, either 'get' or 'post'.
   * @param {string} path API endpoint URL suffix.
   * @param {Object} params Any parameters for the request.
   * @return {Promise} An object containing the API response.
  */
  doRequest(method, path, params) {
    return this.rawRequest(method, path, false, params);
  }

  /**
   * Do a signed private request.
   * @access private
   * @param {string} method HTTP request method, either 'get' or 'post'.
   * @param {string} path API endpoint URL suffix.
   * @param {Object} params Any parameters for the request.
   * @return {Promise} An object containing the API response.
  */
  doSignedRequest(method, path, params) {
    return this.rawRequest(method, path, true, params);
  }

  /**
   * Retrieve balance for a particular coin.
   * @access public
   * @param {{symbol: string}} [params] The coin's symbol for the balance you want to retrieve.
   * @return {Promise} An object containing the API response.
   * @example <caption>Retrieve the balance for NEO:</caption>
   * kc.getBalance({
   *   symbol: 'NEO'
   * }).then(console.log).catch(console.error)
   * 
   * // Returns:
   * 
   * {
   *   "success": true,
   *   "code": "OK",
   *   "msg": "Operation succeeded.",
   *   "timestamp": 1509592077557,
   *   "data": {
   *     "coinType": "NEO",
   *     "balanceStr": "10.72040467",
   *     "freezeBalance": 0,
   *     "balance": 10.72040467,
   *     "freezeBalanceStr": "0.0"
   *   }
   * }
   * @example <caption>Retrieve the balance for all coins (including zero balances):</caption>
   * kc.getBalance().then(console.log).catch(console.error)
  */
  getBalance(coin) {
    return this.doSignedRequest('get', constants.urls.KUCOIN_GET_BALANCE_PREFIX + (coin?coin:'') +
      constants.urls.KUCOIN_GET_BALANCE_SUFFIX);
  }
}

module.exports = Kucoin;
