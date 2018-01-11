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
 * @param {req.body.apiKey} - User`s telegram ID
 * @param {req.body.secretKey} - User`s telegram ID
 * @return {object} - Returns information about the user's wallet
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  if (!constants.encryptation.USER_ID_ENCRYPTATION_KEY || 
      !constants.encryptation.WALLET_API_ENCRYPTATION_KEY || 
      !constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY){
    return res.status(500).json({
      data: constants.messages.error.API_DISABLED
    });
  }
  let {userId, exchanger, apiKey, secretKey} = req.body;
  if (!validator.isValidInteger(userId))
    return res.status(400).json({
      data: constants.messages.error.INVALID_USER_ID
    });
  if (!validator.isValidString(exchanger))
    return res.status(400).json({
      data: constants.messages.error.INVALID_EXCHANGER
    });
  if (!validator.isValidString(apiKey))
    return res.status(400).json({
      data: constants.messages.error.INVALID_WALLET_API_KEY
    });
  if (!validator.isValidString(secretKey))
    return res.status(400).json({
      data: constants.messages.error.INVALID_WALLET_SECRET_KEY
    });
  try{
    let walletData = {
      userId: encryptor(userId, constants.encryptation.USER_ID_ENCRYPTATION_KEY),
      exchanger: exchanger.toLowerCase().trim(),
      walletApi: encryptor(apiKey.trim(), constants.encryptation.WALLET_API_ENCRYPTATION_KEY),
      walletSecret: encryptor(secretKey.trim(), constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY)
    };
    return res.status(200).json({
      data: walletData
    });
  } catch(err){
    logger.error(err);
    return res.status(500).json({
      data: constants.messages.error.UNEXPECTED
    });
  }
};

