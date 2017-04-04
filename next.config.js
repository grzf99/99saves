module.exports = {
  webpack: (config, { dev }) => {
    // Perform customizations to config
    config.externals = {
      'cheerio': 'window',
      'react/addons': true, // important!!
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    };
    // Important: return the modified config
    return config;
  }
};
