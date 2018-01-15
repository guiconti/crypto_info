'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = require('../server/core/router.js');
const morgan = require('morgan');
const logger = require('./logger');
const app = express();

app.use('/api', router);
app.use(logger.errorHandler());
app.use(morgan('tiny'));

//  Start cron jobs
require('./startCronJobs');

module.exports = app;