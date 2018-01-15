/**
 * Module to create API Keys
 * @module utils/generateApiKey
 */
const database = require('../models/database');
const apiKeyManager = require('../utils/apiKeyManager');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');


/**
 * Create a new api key
 * Receive user's information and generate a new api key
 *
 * @param {object} req.body - User data
 * @return {string} - Returns a encryptated hash that will be used as the user`s API KEY
 * @throws {object} - Returns a msg that indicates a fail
 * 
 */
module.exports = function(req, res){
  let {name, source} = req.body;
  if (!validator.isValidString(name))
    return res.status(400).json({
      msg: constants.messages.error.INVALID_NAME
    });
  if (!validator.isValidString(source))
    return res.status(400).json({
      msg: constants.messages.error.INVALID_SOURCE
    });
  
  let userInfo = {name, source};
  let newApiUser = database.api_user.build(userInfo);
  newApiUser
    .save()
    .then(createdApiUser => {
      apiKeyManager.generateApiKey(createdApiUser)
        .then((apiKey) => {
          return res.status(200).json({
            msg: apiKey
          });
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            msg: constants.messages.error.UNEXPECTED
          });
        });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        msg: constants.messages.error.UNEXPECTED
      });
    });
};