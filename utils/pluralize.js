module.exports = (length, config) => {
  if (length === 0 || length === 1) {
    return config[length];
  }
  return config[2];
};
