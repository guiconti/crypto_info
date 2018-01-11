/**
 * Get wallet API key and secret key
 * @module utils/getWalletKeys
*/

const database = require('../models/database');
const constants = require('../utils/constants');
const request = require('request');
const logger = require('../../tools/logger');

/**
 * Get wallet API key and secret key
 *
 * @param {string} userId - User id
 * @return {object} - Returns the wallet keys
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = userId => {
  return new Promise((resolve, reject) => {
    database.wallet
      .findById(userId)
      .then(wallet => {
        return resolve(wallet);
      })
      .catch(err => {
        return reject(constants.messages.error.UNEXPECTED)
      })
  });
};
