const cron = require('node-cron');

//  Jobs
const updateWalletInfo = require('../server/controllers/updateWalletInfo');

//  Start jobs
cron.schedule('*/15 * * * *', updateWalletInfo);