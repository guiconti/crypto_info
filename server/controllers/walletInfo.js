/**
 * Get information about user's wallet
 * @module controllers/walletInfo
*/

const Kucoin = require('../utils/Kucoin');

/**
 * Get information about user`s wallet
 *
 * @param {object} req.query.coin - Coin to get info
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  return res.status(200).json({
    msg: 'Hi'
  });
};