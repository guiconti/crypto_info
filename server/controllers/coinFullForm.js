/**
 * Get information about one coin at user's wallet
 * @module controllers/walletCoinBalance
*/

const Kucoin = require('../utils/Kucoin');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

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
  console.log('ello');
  
  return res.status(400).json({
    data: 'batuta esse postman  eim'
  });
  // if (!validator.isValidString(coin))
  //   return res.status(400).json({
  //     data: constants.messages.error.INVALID_CURRENCY
  //   });
  // let myWallet = new Kucoin(process.env.KUCOIN_API_KEY, process.env.KUCOIN_SECRET);
  // myWallet.getCoinBalance(coin)
  //   .then(balanceInfo => {
  //     if (balanceInfo.error)
  //       return res.status(400).json({
  //         data: constants.messages.error.INVALID_CRYPTO_CURRENCY
  //       });
  //     return res.status(200).json({
  //       data: {
  //         coin: balanceInfo.data.coinType,
  //         balance: balanceInfo.data.balance
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       data: constants.messages.error.UNEXPECTED
  //     });
  //   });
};