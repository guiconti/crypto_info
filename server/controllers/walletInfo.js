/**
 * Get information about user's wallet
 * @module controllers/walletInfo
*/

const Kucoin = require('../utils/Kucoin');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

/**
 * Get information about user`s wallet
 *
 * @param {object} req.query.coin - Coin to get info
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  let {coin} = req.query;
  if (!validator.isValidString(coin))
    return res.status(400).json({
      data: constants.messages.error.INVALID_CURRENCY
    });
  let myWallet = new Kucoin(process.env.KUCOIN_API_KEY, process.env.KUCOIN_SECRET);
  myWallet.getBalance(coin)
    .then(balanceInfo => {
      if (balanceInfo.error)
        return res.status(400).json({
          data: constants.messages.error.INVALID_CRYPTO_CURRENCY
        });
      return res.status(200).json({
        data: {
          coin: balanceInfo.data.coinType,
          balance: balanceInfo.data.balance
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    });
};