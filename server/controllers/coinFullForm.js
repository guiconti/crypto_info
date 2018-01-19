/**
 * Get coin's full form name from the Kucoin API
 * @module controllers/coinFullForm
*/

const validator = require('../utils/validator');
const constants = require('../utils/constants');
const request = require('request');

/**
 * Get coin's full form name from the Kucoin API
 *
 * @param {object} req.query.coin - Coin to get info
 * @return {string} - Returns crypto's full form name
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  let reqCoin = req.query.coin.toUpperCase();
  console.log(reqCoin);
  let url = constants.urls.KUCOIN_PREFIX + constants.urls.KUCOIN_GET_COIN_INFO;
  if (!validator.isValidString(reqCoin))
    return res.status(400).json({
      data: constants.messages.error.INVALID_CRYPTO_CURRENCY
    });

  request.get({url}, (err, httpResponse, body) => {
    let dataBody = JSON.parse(body);
    let answerMsg = constants.messages.success.COIN_NAME_PREFIX;
    if (err)
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    
    if(reqCoin == "DBC")
      return res.status(200).json({
        data: answerMsg += constants.values.DBC
      });
    dataBody.data.forEach(kCoin => {
      if (kCoin.coin == reqCoin){
        return res.status(200).json({
          data: answerMsg + kCoin.name
        });
      }
    });
    return res.status(400).json({
      data: constants.messages.error.UNKOWN_COIN
    });
  });
};