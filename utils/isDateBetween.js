const { differenceInDays } = require('date-fns');

// TODO: Use isSameDay after testing the flow with hours
module.exports = (date, start, end) =>
  differenceInDays(date, start) > 0 && differenceInDays(date, end) <= 0;
