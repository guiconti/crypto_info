/**
 * Get info about all wallets
 * @module utils/getAllWallets
*/

const database = require('../models/database');

/**
 * Get information about all wallets in the database
 *
 * @return {object} - Returns information about all wallets in the database
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = () => {
  return new Promise((resolve, reject) => {
    database.wallet
      .find()
      .then(wallets => {
        return resolve(wallets);
      })
      .catch(err => {
        return reject(err);
      })
  });
};
