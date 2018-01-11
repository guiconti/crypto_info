/**
 * Module to encrypt data
 * @module utils/encryptor
 */
const crypto = require('crypto-js');
const constants = require('./constants');

/**
 * Encrypt a decrypted data
 *
 * @param {string} decryptedData - Data to be encrypted
 * @param {string} key - Key to encrypt the data
 * @return {object} - Returns the data encrypted
 * @throws {object} - Returns -1 that indicates a fail
 * 
*/
module.exports = (decryptedData, key) => {
  return new Promise((resolve, reject) => {
    try {
      if(!decryptedData) return reject(constants.messages.error.INVALID_ENCRYPT_DATA);
      let encryptedData = crypto.AES.encrypt(JSON.stringify(decryptedData), key).toString();
      return resolve(encryptedData);  
    } catch (err){
      return reject(err);
    }   
  });
};
