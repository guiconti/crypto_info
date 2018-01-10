/**
 * Get information about user's wallet
 * @module controllers/walletBalance
*/

const Kucoin = require('../utils/Kucoin');
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
  getBTCtoUSD()
    .then(BTCtoUSDValue => {
      let myWallet = new Kucoin(process.env.KUCOIN_API_KEY, process.env.KUCOIN_SECRET);
      myWallet.getBalance()
        .then(balanceInfo => {
          if (balanceInfo.error)
            return res.status(400).json({
              data: constants.messages.error.INVALID_CRYPTO_CURRENCY
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
    })
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

