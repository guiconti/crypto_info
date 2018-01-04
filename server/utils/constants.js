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
  urls: {
    CRYPTO_CURRENCY_INFO_PREFIX: 'https://api.blinktrade.com/api/v1/',
    CRYPTO_CURRENCY_INFO_SUFFIX: '/ticker?crypto_currency=',
    BITTREX_CURRENCY_EXCHANGE_PREFIX: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market='
  }
};
