/**
 * All project constants
 * @module utils/constants
*/
module.exports = {
  messages: {
    error: {
      INVALID_CRYPTO_CURRENCY: 'You need to send a valid crypto currency.',
      INVALID_CURRENCY: 'You need to send a valid currency.',
      ACCESS_BLOCKCHAIN_INFO: 'There is a problem with the connection to this blockchain info. Please try again.'
    },
    success: {
      USER_REGISTERED: 'User registered.'
    }
  },
  values: {
    FINAL_CURRENCY: 'BRL'
  },
  urls: {
    BTC_INFO: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    BITTREX_CURRENCY_EXCHANGE_PREFIX: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=',
    KUCOIN_PREFIX: 'https://api.kucoin.com',
    KUCOIN_GET_BALANCE_PREFIX: '/v1/account/',
    KUCOIN_GET_BALANCE_SUFFIX: '/balance'
  }
};
