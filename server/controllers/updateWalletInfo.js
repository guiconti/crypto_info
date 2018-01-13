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
module.exports = () => {
  getAllWallets
    .then(wallets => {
      console.log(wallets);
    })
    .catch(err => {
      console.log(err);
      logger.critical(err);
      return;
    });
};
