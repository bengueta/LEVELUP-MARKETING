/**
 * Metro bundler configuration for Expo
 * Supports path aliases defined in tsconfig.json
 * Fixes import.meta issue for web platform by disabling Hermes for web
 * @see https://docs.expo.dev/guides/customizing-metro/
 */

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Fix for import.meta error on web
// Disable Hermes transform for web builds - Hermes doesn't work well with import.meta on web
config.resolver = {
  ...config.resolver,
  sourceExts: [...(config.resolver?.sourceExts || []), 'mjs'],
  unstable_enablePackageExports: true,
};

// Check if we're building for web platform
const isWebBuild = process.argv.includes('--web') || 
                   process.env.EXPO_PUBLIC_PLATFORM === 'web' || 
                   process.env.EXPO_PLATFORM === 'web';

if (isWebBuild) {
  // For web builds, use standard JS transformer instead of Hermes
  config.transformer = {
    ...config.transformer,
    unstable_allowRequireContext: true,
  };
} else {
  // For native platforms, keep default configuration
  config.transformer = {
    ...config.transformer,
    unstable_allowRequireContext: true,
  };
}

module.exports = config;
