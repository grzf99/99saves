const { isSameHour, isBefore, isAfter } = require('date-fns');

// TODO: Use isSameDay after testing the flow with hours
module.exports = (date, start, end) =>
  isAfter(date, start) && (isSameHour(date, end) || isBefore(date, end));
