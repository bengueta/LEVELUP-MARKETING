# Troubleshooting Guide

## 🔧 Fixed Issues

### 1. Port 8081 Already in Use
**Problem:** Port 8081 was occupied by previous processes  
**Solution:**
```powershell
# Stop all Node/Expo processes
Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*expo*"} | Stop-Process -Force

# Clear port 8081
netstat -ano | findstr ":8081" | ForEach-Object { $_.Split()[-1] } | ForEach-Object { taskkill /F /PID $_ }
```

### 2. Environment Variable Warnings (NO_COLOR/FORCE_COLOR)
**Problem:** Warning messages about conflicting color environment variables  
**Solution:**
```powershell
# Clear environment variables
$env:FORCE_COLOR = $null
$env:NO_COLOR = $null
```

**Note:** These warnings are non-critical and don't affect app functionality.

### 3. ios_webkit_debug_proxy ENOENT Error
**Problem:** Error when trying to debug iOS webviews  
**Solution:** This is only relevant for iOS webview debugging, not for web browser testing.

**For web browser testing:** This error can be ignored - it doesn't affect web builds.

**For iOS debugging (if needed):**
- Install `ios-webkit-debug-proxy` separately
- Only needed for debugging webviews in iOS apps
- Not required for standard web development

## 🚀 Current Server Status

The server should now be running on:
- **URL:** http://localhost:8081
- **Status:** Check with `netstat -ano | findstr ":8081"`

## 📝 Accessing the App

### In Browser:
1. Open http://localhost:8081 in your browser
2. The app should load automatically
3. If not, check the terminal for the exact URL

### Using Expo CLI:
```bash
# Start server
npx expo start --web --port 8081

# Or press 'w' in the Expo CLI to open in browser
```

## ✅ Verification Steps

1. **Check if server is running:**
   ```powershell
   netstat -ano | findstr ":8081"
   ```
   Should show LISTENING status

2. **Check browser console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Check terminal output:**
   - Look for "Web Bundled" message
   - Check for any error messages in red

## 🔍 Common Issues

### App doesn't load in browser
- **Check:** Is the server running? (netstat command above)
- **Check:** Try http://127.0.0.1:8081 instead of localhost
- **Check:** Clear browser cache (Ctrl+Shift+Delete)
- **Check:** Try incognito/private browsing mode

### Build errors
- **Clear cache:** `npx expo start --web --clear`
- **Reinstall dependencies:** `npm install`
- **Check TypeScript errors:** `npm run type-check`

### Navigation not working
- React Navigation Native Stack works on web
- If issues occur, check browser console for errors
- Ensure all dependencies are installed correctly

## 📞 Getting Help

If issues persist:
1. Check browser console for errors
2. Check terminal for build errors
3. Verify all dependencies are installed: `npm install`
4. Try clearing cache: `npx expo start --web --clear --port 8081`

