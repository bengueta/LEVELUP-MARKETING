# Fix for import.meta Error

## Problem
`Cannot use 'import.meta' outside a module` error when running Expo web.

## Root Cause
The `@expo/metro-runtime` package uses `import.meta` which is not properly handled by Metro bundler for web builds in some configurations.

## Solution Applied

### 1. Updated `metro.config.js`
- Added proper module resolution
- Enabled package exports support
- Added mjs extension support

### 2. Created `babel.config.js`
- Simple Babel config with Expo preset
- No special transforms needed (Expo handles it)

### 3. Cleaned Cache
- Removed `.expo` cache directory
- Restarted server with `--clear` flag

## Steps to Fix

1. **Stop the server** (if running)
2. **Clear cache:**
   ```bash
   Remove-Item -Path ".expo" -Recurse -Force
   ```
3. **Restart server:**
   ```bash
   npx expo start --web --clear --port 8081
   ```

## Alternative Solution (if still not working)

If the error persists, try:

1. **Update Expo packages:**
   ```bash
   npx expo install --fix
   ```

2. **Check Expo SDK version:**
   - Ensure using Expo SDK 54 (latest stable)
   - Some older versions have known issues

3. **Use webpack instead of metro (if needed):**
   ```json
   "web": {
     "bundler": "webpack"
   }
   ```
   Then install: `npm install --save-dev @expo/webpack-config`

## Verification

After restart, check:
1. Browser console (F12) - should not show import.meta error
2. App should load without white screen
3. Navigation should work

## References
- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [Metro Configuration](https://docs.expo.dev/guides/customizing-metro/)
- [Babel Configuration](https://docs.expo.dev/guides/customizing-babel/)

