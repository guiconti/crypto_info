/**
 * Module of validation functions
 * @module controllers/validator
*/

const _ = require('underscore');

/**
 * Validate if the input is a valid not empty string
 *
 * @param {string} stringToValidate - String to be validated
 * @return {boolean} - True case the string is valid and false if it is not
 */
exports.isValidString = stringToValidate => {
  return _.isString(stringToValidate) && stringToValidate.trim().length > 0;
};
