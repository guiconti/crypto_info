/**
 * Get information about user's wallet
 * @module controllers/walletBalance
*/

const Kucoin = require('../utils/Kucoin');
const getWalletKeys = require('../utils/getWalletKeys');
const decryptor = require('../utils/decryptor');
const getFormatedWalletBalance = require('../utils/getFormatedWalletBalance');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

/**
 * Get information about user`s wallet
 *
 * @return {object} - Returns information about the user's wallet
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  if (!validator.isEncryptationActive)
    return res.status(500).json({
      data: constants.messages.error.API_DISABLED
    });

  let {userId} = req.params;
  if (!validator.isValidInteger(userId))
    return res.status(400).json({
      data: constants.messages.error.INVALID_USER_ID
    });
  getWalletKeys(userId.trim())
    .then(walletInfo => {
      if (!walletInfo)
        return res.status(400).json({
          data: constants.messages.error.USER_NOT_REGISTERED
        });
      let walletApi = decryptor(walletInfo.walletApi, constants.encryptation.WALLET_API_ENCRYPTATION_KEY);
      let walletSecret = decryptor(walletInfo.walletSecret, constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY);
      let wallet = new Kucoin(walletApi, walletSecret);
      getFormatedWalletBalance(wallet)
        .then(formattedWallet => {
          return res.status(200).json({
            data: formattedWallet
          });
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            data: constants.messages.error.UNABLE_TO_GET_WALLET
          });
        });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    });
};

