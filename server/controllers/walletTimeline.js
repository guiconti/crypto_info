/**
 * Retrieve wallet`s timeline
 * @module controllers/walletTimeline
*/

const database = require('../models/database');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

/**
 * Retrieve wallet`s timeline
 * @param {req.params.userId} - User`s ID
 * @return {object} - Returns information about the user's wallet
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  if (!validator.isEncryptationActive)
    return res.status(500).json({
      data: constants.messages.error.API_DISABLED
    });
  
  let {userId} = req.params;
  if (!validator.isValidInteger(userId))
    return res.status(400).json({
      data: constants.messages.error.INVALID_USER_ID
    });

  database.timeline
    .findAll({
      where : {walletId: userId}, 
      order: [['timestamp']]
    })
    .then(timeline => {
      let chartData = {};
      timeline.forEach(coinInfo => {
        if (!chartData[coinInfo.coinType])
          chartData[coinInfo.coinType] = {
            timestamps: [],
            USDValues: []
          };
        chartData[coinInfo.coinType].timestamps.push(coinInfo.timestamp);
        chartData[coinInfo.coinType].USDValues.push(coinInfo.USDValue);
      });
      return res.status(200).json({
        data: chartData
      });
    })
    .catch(err => {
      logger.error(err);
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    })

};

