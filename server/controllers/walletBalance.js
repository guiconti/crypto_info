/**
 * Get information about user's wallet
 * @module controllers/walletBalance
*/

const Kucoin = require('../utils/Kucoin');
const getWalletKeys = require('../utils/getWalletKeys');
const encryptor = require('../utils/encryptor');
const decryptor = require('../utils/decryptor');
const getBTCtoUSD = require('../utils/getBTCtoUSD');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const logger = require('../../tools/logger');

/**
 * Get information about user`s wallet
 *
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
  getWalletKeys(userId.trim())
    .then(wallet => {
      if (!wallet)
        return res.status(400).json({
          data: constants.messages.error.USER_NOT_REGISTERED
        });
      let walletApi = decryptor(wallet.walletApi, constants.encryptation.WALLET_API_ENCRYPTATION_KEY);
      let walletSecret = decryptor(wallet.walletSecret, constants.encryptation.WALLET_SECRET_ENCRYPTATION_KEY);
      getBTCtoUSD()
        .then(BTCtoUSDValue => {
          let myWallet = new Kucoin(walletApi, walletSecret);
          myWallet.getBalance()
            .then(balanceInfo => {
              if (!balanceInfo.success)
                return res.status(500).json({
                  data: constants.messages.error.UNABLE_TO_GET_WALLET
                });
              myWallet.getTradingSymbols()
                .then(kucoinMarket => {
                  let activeWallet = [];
                  balanceInfo.data.forEach(coinInfo => {
                    if (coinInfo.balance > 0){
                      convertToSellCurrencies(coinInfo, kucoinMarket.data, BTCtoUSDValue);
                      activeWallet.push(coinInfo);
                    }
                  });
                  return res.status(200).json({
                    data: activeWallet
                  }); 
                })
                .catch(err => {
                  logger.error(err);
                  return res.status(500).json({
                    data: constants.messages.error.UNEXPECTED
                  });
                });
            })
            .catch(err => {
              logger.error(err);
              return res.status(500).json({
                data: constants.messages.error.UNEXPECTED
              });
            });
        })
        .catch(err => {
          logger.error(err);
          return res.status(500).json({
            data: constants.messages.error.ACCESS_BLOCKCHAIN_INFO
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        data: constants.messages.error.UNEXPECTED
      });
    });
};

function convertToSellCurrencies(coin, marketList, BTCtoUSDValue){
  if (coin.coinType === 'BTC')
    return;
  marketList.every(marketCoin => {
    if (marketCoin.symbol === coin.coinType + '-BTC'){
      coin.RatioBTCValue = marketCoin.sell;
      coin.BTCValue = marketCoin.sell * coin.balance;
      coin.USDValue = coin.BTCValue * BTCtoUSDValue;
      return false;
    }
    return true;
  });
};

