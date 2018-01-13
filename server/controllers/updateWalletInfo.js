/**
 * Update wallet info
 * @module utils/getAllWallets
*/

const getAllWallets = require('../utils/getAllWallets');
const database = require('../models/database');
const logger = require('../../tools/logger');

/**
 * Get information about all wallets to create their timelines
 *
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  getAllWallets()
    .then(wallets => {
      wallets.forEach(wallet => {
        let kucoinWallet = new Kucoin(wallet.walletApi, wallet.walletSecret);
        console.log(wallet.dataValues);
      });
    })
    .catch(err => {
      console.log(err);
      logger.critical(err);
      return;
    });
  return res.status(200).json({
    data: 'Hi'
  });
};
