/**
 * All project constants
 * @module utils/constants
*/
module.exports = {
  messages: {
    error: {
      INVALID_CRYPTO_CURRENCY: 'You need to send a valid crypto currency.',
      INVALID_CURRENCY: 'You need to send a valid currency.',
      ACCESS_BLOCKCHAIN_INFO: 'There is a problem with the connection to this blockchain info. Please try again.',
      INVALID_ENCRYPT_DATA: 'Invalid data sent to encrypt',
      INVALID_DECRYPT_DATA: 'Invalid data sent to decrypt',
      INVALID_USER_ID: 'Invalid user id',
      INVALID_EXCHANGER: 'Invalid exchanger',
      INVALID_WALLET_API_KEY: 'Invalid wallet api key',
      INVALID_WALLET_SECRET_KEY: 'Invalid wallet secret key',
      API_DISABLED: 'This API is not enabled at the server right now',
      USER_NOT_REGISTERED: 'This user is not registered in our database.',
      UNABLE_TO_GET_WALLET: 'We could not retrieve your wallet from the exchange. Please try again.',
      INVALID_NAME: 'The name sent is invalid.',
      INVALID_SOURCE: 'The source sent is invalid.',
      INVALID_ID: 'The id sent is invalid.',
      NO_ACCESS_TO_API_KEY: 'You need a valid API key to access this feature.',
      UNEXPECTED: 'An unexpected error occurred while trying to access your info. Please try again.'
    },
    success: {
      WALLET_REGISTERED: 'Wallet registered.'
    }
  },
  values: {
    FINAL_CURRENCY: 'BRL'
  },
  urls: {
    BTC_INFO: 'https://api.coindesk.com/v1/bpi/currentprice.json',
    BITTREX_CURRENCY_EXCHANGE_PREFIX: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=',
    KUCOIN_PREFIX: 'https://api.kucoin.com',
    KUCOIN_GET_BALANCE: '/v1/account/balance',
    KUCOIN_GET_COIN_BALANCE_PREFIX: '/v1/account/',
    KUCOIN_GET_COIN_BALANCE_SUFFIX: '/balance',
    KUCOIN_GET_MARKET_LIST: '/v1/market/open/symbols',
    KUCOIN_GET_COIN_INFO: '/v1/market/open/coins'
  },
  regex: {
    integer: /^-?\d+$/
  },
  encryptation: {
    WALLET_API_ENCRYPTATION_KEY: process.env.WALLET_API_ENCRYPTATION_KEY,
    WALLET_SECRET_ENCRYPTATION_KEY: process.env.WALLET_SECRET_ENCRYPTATION_KEY
  }
};
