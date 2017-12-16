/**
 * All project constants
 * @module utils/constants
*/
module.exports = {
  messages: {
    error: {
      INVALID_CRYPTO_CURRENCY: 'You need to send a valid crypto currency.',
      INVALID_CURRENCY: 'You need to send a valid currency.',
    },
    success: {
      USER_REGISTERED: 'User registered.'
    }
  },
  urls: {
    CRYPTO_CURRENCY_INFO_PREFIX: 'https://api.blinktrade.com/api/v1/',
    CRYPTO_CURRENCY_INFO_SUFFIX: '/ticker?crypto_currency='
  }
};
