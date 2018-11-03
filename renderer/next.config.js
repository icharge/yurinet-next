const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');

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
};

module.exports = withPlugins([
  [withSass, sassConfig],
], nextConfig);
