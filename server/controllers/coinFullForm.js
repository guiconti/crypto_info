/**
 * Get coin's full form name from the Kucoin API
 * @module controllers/walletCoinBalance
*/

const Kucoin = require('../utils/Kucoin');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const request = require('request');

/**
 * Get coin's full form name from the Kucoin API
 *
 * @param {object} req.body.coin - Coin to get info
 * @return {string} - Returns crypto's full form name
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  let {coin} = req.body;
  let url = constants.urls.KUCOIN_PREFIX + constants.urls.KUCOIN_GET_COIN_INFO;
  
  request.get({url: url}, (err, httpResponse, body) => {
    let databody = JSON.parse(body);
    let answ = constants.messages.success.COIN_NAME_PREFIX;
    if (err)
    return res.status(500).json({
      msg: constants.messages.error.UNEXPECTED
    });
    
    if(coin.toUpperCase() == "DBC")
      return res.status(200).json({
        msg: answ += "DeepBrain Chan"
      });
    databody.data.forEach(datacoin => {
      if (datacoin.coin == coin.toUpperCase()){
        return res.status(200).json({
          msg: answ + datacoin.name
        });
      }
    });
    return res.status(400).json({
      msg: constants.messages.error.UNKOWN_COIN
    });

  });
};