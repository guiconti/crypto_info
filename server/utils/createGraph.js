/**
 * Module to create a graph
 * @module utils/decryptor
*/

const ChartjsNode = require('chartjs-node');
const constants = require('./constants');

/**
 * Create a graph and return its buffer
 *
 * @param {array} labels - Data to be decrypted
 * @param {array} data - Key to decrypt the data
 * @return {buffer} - Returns all the data inside the encrypted data
 * @throws {object} - Returns a msg that indicates a fail
 * 
*/
module.exports = (label, xData, yData, fileName) => {
  return new Promise((resolve, reject) => {
    let chartOptions = {
      type: 'line',
      data: {
        labels: xData,
        datasets: [{
            label: label,
            data: yData
        }]
      },
      options: {
        responsive: false,
        width: 400,
        height: 400,
        animation: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          mode: 'label'
        }
      }
    };

    var chartNode = new ChartjsNode(1920, 1080);
    return chartNode.drawChart(chartOptions)
      .then(() => {
        // chart is created
        // get image as png buffer
        return chartNode.getImageBuffer('image/png');
      })
      .then(buffer => {
        Array.isArray(buffer) // => true
        // as a stream
        return chartNode.getImageStream('image/png');
      })
      .then(streamResult => {
        streamResult.stream // => Stream object
        streamResult.length // => Integer length of stream
        // write to a file
        let savePath = constants.paths.GRAPHS_PATH + constants.paths.WALLET_SUFFIX + fileName + '.png';
        return chartNode.writeImageToFile('image/png', savePath);
      })
      .then(() => {
        chartNode.destroy();
        return resolve(constants.paths.WALLET_SUFFIX + fileName + '.png');
      })
      .catch(err => {
        return reject(err);
      });
  });   
};
