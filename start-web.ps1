# PowerShell script to start Expo web server without Hermes
# This fixes the import.meta error on web

$env:EXPO_PLATFORM = 'web'
$env:EXPO_PUBLIC_PLATFORM = 'web'

Write-Host "Starting Expo web server (without Hermes)..." -ForegroundColor Green
npx expo start --web --clear --port 8081

