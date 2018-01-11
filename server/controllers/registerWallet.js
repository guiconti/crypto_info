/**
 * Register a new wallet to the DB
 * @module controllers/registerWallet
*/

const database = require('../models/database');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const encryptor = require('../utils/encryptor');
const logger = require('../../tools/logger');

/**
 * Register a new wallet to DB
 * @param {req.body.userId} - User`s ID
 * @param {req.body.exchanger} - User`s telegram ID
 * @param {req.body.walletApi} - User`s telegram ID
 * @param {req.body.walletSecret} - User`s telegram ID
 * @return {object} - Returns information about the user's wallet
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  if (!validator.isEncryptationActive)
    return res.status(500).json({
      data: constants.messages.error.API_DISABLED
    });
  
  let {userId, exchanger, walletApi, walletSecret} = req.body;
  if (!validator.isValidInteger(userId))
    return res.status(400).json({
      data: constants.messages.error.INVALID_USER_ID
    });
  if (!validator.isValidString(exchanger))
    return res.status(400).json({
      data: constants.messages.error.INVALID_EXCHANGER
    });
  if (!validator.isValidString(walletApi))
    return res.status(400).json({
      data: constants.messages.error.INVALID_WALLET_API_KEY
    });
  if (!validator.isValidString(walletSecret))
    return res.status(400).json({
      data: constants.messages.error.INVALID_WALLET_SECRET_KEY
    });
  try{
    let walletData = {
      userId: userId.toString().trim(),
      exchanger: exchanger.toLowerCase().trim(),
      walletApi: encryptor(walletApi.trim(), constants.encryptation.WALLET_API_ENCRYPTATION_KEY),
      walletSecret: encryptor(walletSecret.trim(), constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY)
    };
    let newWallet = database.wallet.build(walletData);
    newWallet
      .save()
      .then(() => {
        return res.status(200).json({
          data: constants.messages.success.WALLET_REGISTERED
        })
      })
      .catch(err => {
        return res.status(500).json({
          data: constants.messages.error.UNEXPECTED
        });
      });
  } catch(err){
    logger.error(err);
    return res.status(500).json({
      data: constants.messages.error.UNEXPECTED
    });
  }
};

