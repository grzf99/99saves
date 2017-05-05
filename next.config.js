const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.HEROKU_APP_NAME': JSON.stringify(
          process.env.HEROKU_APP_NAME
        )
      })
    );
    // Perform customizations to config
    config.externals = {
      cheerio: 'window',
      'react/addons': true, // important!!
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    };
    // Important: return the modified config
    return config;
  }
};
