/**
 * Get formated wallet balance
 * @module utils/getFormatedWalletBalance
*/

const getBTCtoUSD = require('../utils/getBTCtoUSD');

/**
 * Get wallet information and format it
 *
 * @param {object} wallet - Wallet to get information
 * @return {object} - Returns formated information
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (wallet) => {
  return new Promise((resolve, reject) => {
    getBTCtoUSD()
      .then(BTCtoUSDValue => {
        wallet.getBalance()
          .then(balanceInfo => {
            if (!balanceInfo.success)
              return reject(balanceInfo.msg);
            wallet.getTradingSymbols()
              .then(market => {
                let activeWallet = [];
                balanceInfo.data.forEach(coinInfo => {
                  if (coinInfo.balance > 0){
                    convertToSellCurrencies(coinInfo, market.data, BTCtoUSDValue);
                    activeWallet.push(coinInfo);
                  }
                });
                return resolve(activeWallet);
              })
              .catch(err => {
                return reject(err);
              });
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
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
