const { isSameDay, isBefore, isAfter } = require('date-fns');

module.exports = (date, start, end) =>
  isAfter(date, start) && (isSameDay(date, end) || isBefore(date, end));
