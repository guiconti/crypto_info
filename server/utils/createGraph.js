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
module.exports = (label, xData, yData) => {
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
        // using the length property you can do things like
        // directly upload the image to s3 by using the
        // stream and length properties
        streamResult.stream // => Stream object
        streamResult.length // => Integer length of stream
        // write to a file
        return chartNode.writeImageToFile('image/png', './server/graphs/' + coin + '.png');
    })
    .then(() => {
      chartNode.destroy();
    });
  });   
};
