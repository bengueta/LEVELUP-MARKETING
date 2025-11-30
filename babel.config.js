/**
 * Babel configuration for Expo
 * Fixes import.meta error for web platform
 * @see https://docs.expo.dev/guides/customizing-babel/
 */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [],
  };
};

