# Fix for import.meta Error with Hermes on Web

## Problem
`Cannot use 'import.meta' outside a module` error when running Expo web with Hermes transform enabled.

## Root Cause
Expo SDK 54 uses Hermes by default, and when building for web, the Hermes transform profile (`transform.engine=hermes`) causes issues with `import.meta` which is used by `@expo/metro-runtime`.

## Solution Applied

### 1. Updated `metro.config.js`
- Added detection for web platform builds
- Disabled Hermes-specific transforms for web
- Ensured standard JavaScript transformer is used for web

### 2. Updated `app.json`
- Added `jsEngine: "hermes"` for native platforms (Android/iOS)
- Web uses standard JS (no Hermes needed)

### 3. Created `start-web.ps1` Script
- PowerShell script to start web server with correct environment variables
- Sets `EXPO_PLATFORM=web` to ensure web-specific config is used

## How to Run

### Option 1: Use PowerShell Script (Recommended)
```powershell
.\start-web.ps1
```

### Option 2: Use npm script
```powershell
npm run web:clean
```

### Option 3: Manual start
```powershell
$env:EXPO_PLATFORM = 'web'
npx expo start --web --clear --port 8081
```

## Verification

After starting the server:
1. Open http://localhost:8081 in browser
2. Check browser console (F12) - should NOT show import.meta error
3. App should load without white screen

## Important Notes

- Hermes is still enabled for native platforms (Android/iOS) - this is good for performance
- Web platform uses standard JavaScript - no performance impact, better compatibility
- The error occurs because Hermes parser doesn't fully support ES modules with import.meta on web

## If Still Not Working

1. **Hard refresh browser:** `Ctrl + Shift + R`
2. **Clear browser cache:** `Ctrl + Shift + Delete`
3. **Check server logs:** Look for any errors in terminal
4. **Verify environment:** Make sure `EXPO_PLATFORM=web` is set

## References
- [Expo Web Documentation](https://docs.expo.dev/workflow/web/)
- [Metro Configuration](https://docs.expo.dev/guides/customizing-metro/)
- [Hermes Engine](https://hermesengine.dev/)

