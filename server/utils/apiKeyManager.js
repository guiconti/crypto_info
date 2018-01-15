/**
 * Module to gerenate and decrypt API Keys
 * @module utils/apiKeyManager
 */
const crypto = require('crypto-js');
const constants = require('./constants');

/**
 * User's api encrypt and decrypt key
 * @readonly
 * @const {string}
 */
const apiSecretKey = process.env.API_KEY_ENCRYPTATION;

/**
 * Generates a encrypted api key
 * Receive user's information and generate a new api key
 *
 * @param {object} userData - User data
 * @return {string} - Returns a encryptated hash that will be used as the user`s API KEY
 * @throws {object} - Returns err that indicates a fail
 * 
 */
exports.generateApiKey = userData => {
  return new Promise((resolve, reject) => {
    try {
      if(!userData) return reject(constants.messages.error.INVALID_USER_DATA);
      let apiKey = crypto.AES.encrypt(JSON.stringify(userData), apiSecretKey).toString();
      return resolve(apiKey);  
    } catch (err){
      return reject(err);
    }   
  });
};

/**
 * Ecrypt an encrypted api key
 * Receive an api key and return the user data of that api key
 *
 * @param {string} apiKey - Users`s api Key
 * @return {object} - Returns all the user`s data inside the api key
 * @throws {object} - Returns -1 that indicates a fail
 * 
 */
exports.decryptApiKey = apiKey => {
  return new Promise((resolve, reject) => {
    try {
      if(!apiKey) return reject(constants.messages.error.INVALID_API_KEY);
      let userDataInBytes = crypto.AES.decrypt(apiKey, apiSecretKey);
      let userData = JSON.parse(userDataInBytes.toString(crypto.enc.Utf8));
      return resolve(userData);
    } catch (err) {
      return reject(err);
    }     
  });   
};