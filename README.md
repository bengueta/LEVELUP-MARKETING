# React Native Expo App

A stable, production-ready base for a React Native mobile app built with Expo and TypeScript.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo Go app on your mobile device (for testing)
- For Android development: Android Studio
- For iOS development: Xcode (macOS only)

### Installation

The project dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Running the App

#### Start the development server:
```bash
npx expo start
# or
npm start
```

This will start the Expo development server. You can then:

- Press `a` to open on Android emulator/device
- Press `i` to open on iOS simulator (macOS only)
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your phone

#### Running on Physical Device:

**Android:**
1. Enable USB debugging on your device
2. Connect device via USB
3. Run `npx expo start`
4. Press `a` or scan QR code with Expo Go app

**iOS:**
1. Connect iPhone/iPad via USB
2. Run `npx expo start`
3. Press `i` or scan QR code with Expo Go app

**Using Expo Go App:**
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `npx expo start`
3. Scan the QR code with Expo Go app
4. The app will load on your device

#### Platform-specific commands:

```bash
# Android
npm run android
# or
npx expo start --android

# iOS (macOS only)
npm run ios
# or
npx expo start --ios

# Web
npm run web
# or
npx expo start --web
```

## 📁 Project Structure

```
react-native-expo-app/
├── App.tsx          # Main app component
├── index.ts         # Entry point
├── app.json         # Expo configuration
├── tsconfig.json    # TypeScript configuration
├── package.json     # Dependencies and scripts
├── assets/          # Images, fonts, and other assets
└── node_modules/    # Dependencies (auto-generated)
```

## 🛠️ Tech Stack

- **Expo SDK**: ~54.0.22 (latest stable)
- **React**: 19.1.0
- **React Native**: 0.81.5
- **TypeScript**: ~5.9.2
- **New Architecture**: Enabled (React Native's new architecture)

## 📱 Features

- ✅ TypeScript support with strict mode
- ✅ Expo SDK 54 (latest stable)
- ✅ React Native New Architecture enabled
- ✅ Cross-platform support (iOS, Android, Web)
- ✅ Hot reloading and fast refresh
- ✅ Ready for development

## 🔧 Development

### Making Changes

1. Edit `App.tsx` to start building your app
2. Changes will automatically reload (hot reload)
3. Use TypeScript for type safety

### Adding Dependencies

```bash
# Install a package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>

# Install Expo package
npx expo install <expo-package>
```

### Building for Production

#### EAS Build Setup

EAS Build להפקת APK/IPA בקלות - Easy APK/IPA generation

EAS Build allows you to build native Android and iOS apps without local native development setup.

**First-time setup:**

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure the project for EAS Build
eas build:configure
```

This creates an `eas.json` configuration file. See [EAS Build Configuration](https://docs.expo.dev/build/eas-json/) for details.

#### Building Android APK (Internal Testing)

```bash
# Build Android APK for internal testing
eas build --platform android --profile preview

# Or build Android App Bundle (AAB) for Play Store
eas build --platform android --profile production
```

**First build command (recommended):**
```bash
# Build Android APK - Internal testing profile
eas build --platform android --profile preview
```

This generates an APK file that you can download and install directly on Android devices.

**Notes for EAS Build:**
- First build may take 15-20 minutes
- You'll receive an email with download link when build completes
- APK files can be installed directly on Android devices (enable "Install from unknown sources")
- For Play Store, use `--profile production` to build AAB format

**Reference:** [EAS Build Documentation](https://docs.expo.dev/build/introduction/)  
**Reference:** [Android Build Profiles](https://docs.expo.dev/build/building-on-ci/#android-build-profiles)  
**Reference:** [Internal Distribution](https://docs.expo.dev/build/internal-distribution/)

#### Building iOS IPA

```bash
# Build iOS for internal testing (requires Apple Developer account)
eas build --platform ios --profile preview

# Build iOS for App Store
eas build --platform ios --profile production
```

**Reference:** [iOS Build Profiles](https://docs.expo.dev/build/building-on-ci/#ios-build-profiles)

#### Check Build Status

```bash
# List all builds
eas build:list

# View build details
eas build:view [BUILD_ID]
```

**Reference:** [EAS Build CLI Reference](https://docs.expo.dev/build-reference/eas-build/)

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🎯 Next Steps

1. ✅ Customize `app.json` with your app details (package identifiers configured)
2. Replace assets in the `assets/` folder with your own
3. ✅ Navigation and state management already set up
4. Configure environment variables if needed (see `.env` file)
5. Set up EAS Build for production builds (see Building for Production section)
6. See `TODOS.md` for future enhancements (theming, animations, tests)

## 📝 Notes

- This project uses the latest stable Expo SDK (54.0.22)
- TypeScript strict mode is enabled for better code quality
- The project is ready to use immediately after installation
- All dependencies are already installed and up to date
- EAS Build configured for easy APK/IPA generation
- Minimal identifiers set in `app.json` (package: `com.reactnativeexpoapp`)

