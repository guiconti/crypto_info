/**
 * Register a new wallet to the DB
 * @module controllers/registerWallet
*/

const validator = require('../utils/validator');
const constants = require('../utils/constants');
const encryptor = require('../utils/encryptor');
const logger = require('../../tools/logger');

/**
 * Register a new wallet to DB
 * @param {req.body.telegramId} - User`s telegram ID
 * @param {req.body.exchanger} - User`s telegram ID
 * @param {req.body.apiKey} - User`s telegram ID
 * @param {req.body.secretKey} - User`s telegram ID
 * @return {object} - Returns information about the user's wallet
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  return res.status(200).json({
    msg: 'Hi'
  });
};

