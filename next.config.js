const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');

const sassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[name]___[hash:base64:5]',
  }
};


/* const optimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75
  }
}; */

const nextConfiguration = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        PC: JSON.stringify('pc'),
      }),
    );
    return config;
  },

  /***
   * App config
   * How to use : https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side
   */
  /* serverRuntimeConfig: { // Will only be available on the server side
    // mySecret: 'secret',
  }, */
  publicRuntimeConfig: { // Will be available on both server and client
    // staticFolder: '/static',
    // mySecret: process.env.MY_SECRET, // Pass through env variables

  },

};

module.exports = withPlugins([
  [withSass, sassConfig],
  // [optimizedImages, optimizedImagesConfig],
], nextConfiguration);
