/**
 * Get information about one coin at user's wallet
 * @module controllers/walletCoinBalance
*/

const Kucoin = require('../utils/Kucoin');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const request = require('request');

/**
 * Get information about one coin at user`s wallet
 *
 * @param {object} req.query.coin - Coin to get info
 * @return {object} - Returns information about the crypto currency
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (req, res) => {
  //let {coin} = req.params;
  let {coin} = req.body;
  let url = constants.urls.KUCOIN_PREFIX + constants.urls.KUCOIN_GET_COIN_INFO;
  console.log(url);
  //Kucoin.getCoinInfo;
  
  request.get({url: url}, (err, httpResponse, body) => {
    let databody = JSON.parse(body);
    let ans = 'moeda nawa: ';
    if (err)
    return res.status(500).json({
      msg: constants.messages.error.OVERBUFF_API
    });
    
    console.log (databody.code);
    console.log('coin: ' + coin.toUpperCase());
    
    if(coin.toUpperCase() == "DBC")
      return res.status(200).json({
        msg: ans += "DeepBrain Chan"
      });
    databody.data.forEach(datacoin => {
      if (datacoin.coin == coin.toUpperCase()){
        ans += datacoin.name;
      }
    });
    return res.status(200).json({
      msg: ans
    });
    // overbuffApiDecriptor(body)
    //   .then((heroesInfo) => {
    //     heroesInfo.sort((a, b) => {
    //       return a.pick_rate>=b.pick_rate?-1:1;
    //     });
    //     let topPickedHeroes = heroesInfo.slice(0, constants.overbuff.NUMBER_OF_TOP_PICKED);
    //     topPickedHeroes.forEach((heroInfo) => {
    //       for (key in heroInfo){
    //         if (!constants.overbuff.PICK_INFOS.includes(key)){
    //           delete heroInfo[key];
    //         }
    //       }
    //       heroInfo.hero = constants.overbuff.heroes[heroInfo.hero];
    //       heroInfo.pick_rate = Math.round(heroInfo.pick_rate * 10000)/100 + '%';
    //     });
    //     return res.status(200).json({
    //       msg: topPickedHeroes
    //     });
    //   })
    //   .catch((err) => {
    //     logger.error(err);
    //     return res.status(500).json({
    //       msg: constants.messages.error.OVERBUFF_API
    //     });
    //   });
  });


  // if (!validator.isValidString(coin))
  //   return res.status(400).json({
  //     data: constants.messages.error.INVALID_CURRENCY
  //   });
  // let myWallet = new Kucoin(process.env.KUCOIN_API_KEY, process.env.KUCOIN_SECRET);
  // myWallet.getCoinBalance(coin)
  //   .then(balanceInfo => {
  //     if (balanceInfo.error)
  //       return res.status(400).json({
  //         data: constants.messages.error.INVALID_CRYPTO_CURRENCY
  //       });
  //     return res.status(200).json({
  //       data: {
  //         coin: balanceInfo.data.coinType,
  //         balance: balanceInfo.data.balance
  //       }
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(500).json({
  //       data: constants.messages.error.UNEXPECTED
  //     });
  //   });
};