/**
 * Module to format a time
 * @module utils/formatTime
*/

/**
 * Format a timestamp to MM/DD/YY HH:MM
 *
 * @param {string} timestamp - Timestamp
 * @return {string} - Time in MM/DD/YY HH:MM format
 * @throws {object} - Returns -1 that indicates a fail
 * 
*/
module.exports = timestamp => {
  // Create an array with the current month, day and time
  let date = [ timestamp.getMonth() + 1, timestamp.getDate() ];
  date.push(timestamp.getFullYear()-2000);

  // Create an array with the current hour, minute and second
  let time = [ timestamp.getHours(), timestamp.getMinutes() ];

  // Determine AM or PM suffix based on the hour
  let suffix = ( time[0] < 12 ) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // If seconds and minutes are less than 10, add a zero
  for (let i = 1; i < 3; i++) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  // Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
};