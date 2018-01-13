/**
 * Update wallet info
 * @module utils/getAllWallets
*/

const Kucoin = require('../utils/Kucoin');
const getAllWallets = require('../utils/getAllWallets');
const getFormatedWalletBalance = require('../utils/getFormatedWalletBalance');
const decryptor = require('../utils/decryptor');
const constants = require('../utils/constants');
const database = require('../models/database');
const logger = require('../../tools/logger');

/**
 * Get information about all wallets to create their timelines
 *
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  let timestamp = Date.now();
  getAllWallets()
    .then(wallets => {
      wallets.forEach(walletInfo => {
        let walletApi = decryptor(walletInfo.walletApi, constants.encryptation.WALLET_API_ENCRYPTATION_KEY);
        let walletSecret = decryptor(walletInfo.walletSecret, constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY);
        let wallet = new Kucoin(walletApi, walletSecret);
        getFormatedWalletBalance(wallet)
          .then(walletBalance => {
            walletBalance.forEach(coin => {
              coin.walletId = walletInfo.userId;
              coin.timestamp = timestamp;
              let timelineCoin = database.timeline.build(coin);
              timelineCoin
                .save()
                .then(() => {})
                .catch(err => {
                  logger.critical(err);
                });
            });
          })
          .catch(err => {
            logger.critical(err);
            return;
          });
      });
    })
    .catch(err => {
      logger.critical(err);
      return;
    });
  return res.status(200).json({
    data: 'Hi'
  });
};
