const { isBefore, isAfter, isEqual } = require('date-fns');

// TODO: Use isSameDay after testing the flow with hours
module.exports = (date, start, end) =>
  isAfter(date, start) > 0 && (isEqual(date, end) || isBefore(date, end));
