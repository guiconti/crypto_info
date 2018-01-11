/**
 * Module to decrypt data
 * @module utils/decryptor
 */
const crypto = require('crypto-js');
const constants = require('./constants');

/**
 * Decrypt an encrypted data
 *
 * @param {string} encryptedData - Data to be decrypted
 * @param {string} key - Key to decrypt the data
 * @return {object} - Returns all the data inside the encrypted data
 * @throws {object} - Returns -1 that indicates a fail
 * 
*/
module.exports = (encryptedData, key) => {
  try {
    if(!encryptedData) return reject(constants.messages.error.INVALID_DECRYPT_DATA);
    let decryptedDataInBytes = crypto.AES.decrypt(encryptedData, key);
    let decryptedData = JSON.parse(decryptedDataInBytes.toString(crypto.enc.Utf8));
    return decryptedData;
  } catch (err) {
    return err;
  }      
};