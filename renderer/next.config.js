const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const sassConfig = {
  cssModule: true,
};

const nextConfig = {
  exportPathMap() {
    // Let Next.js know where to find the entry page
    // when it's exporting the static bundle for the use
    // in the production version of your app
    return {
      '/start': { page: '/start' },
    };
  },

  webpack(config) {
    // Further custom configuration here

    /* config.resolve.alias = {
      '../../theme.config$': path.resolve(appDirectory, 'renderer/styles/theme.config'),
    }; */

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    return config;
  },
};

module.exports = withPlugins([
  [withSass, sassConfig],
  [withCSS],
], nextConfig);
