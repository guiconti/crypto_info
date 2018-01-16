/**
 * Get information about one coin at user's wallet
 * @module controllers/walletCoinBalance
*/

const Kucoin = require('../utils/Kucoin');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const request = require('request');

/**
 * Get information about one coin at user`s wallet
 *
 * @param {object} req.query.coin - Coin to get info
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => { 
  //let {coin} = req.params;
  let {coin} = req.body;
  let url = constants.urls.KUCOIN_PREFIX + constants.urls.KUCOIN_GET_COIN_INFO;
  //Kucoin.getCoinInfo;
  
  request.get({url: url}, (err, httpResponse, body) => {
    let databody = JSON.parse(body);
    let answ = 'moeda nawa: ';
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
        //answ += datacoin.name;
        return res.status(200).json({
          msg: answ + datacoin.name
        });
      }
    });
    return res.status(400).json({
      msg: 'num achô'
    });

  });
};