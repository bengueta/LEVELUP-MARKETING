# EAS Build Commands Reference

## Quick Start Commands

### First-Time Setup

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure the project (creates eas.json)
eas build:configure
```

**Reference:** [EAS Build Introduction](https://docs.expo.dev/build/introduction/)

---

## Android Build Commands

### Build Android APK (Internal Testing)

```bash
# First build command - generates APK for direct installation
eas build --platform android --profile preview
```

**Rationale:** APK format allows direct installation on Android devices without Play Store  
**Reference:** [Android Build Profiles](https://docs.expo.dev/build/building-on-ci/#android-build-profiles)  
**Reference:** [Internal Distribution](https://docs.expo.dev/build/internal-distribution/)

**Notes:**
- First build takes 15-20 minutes
- You'll receive email with download link
- APK can be installed directly (enable "Install from unknown sources")
- Use for internal testing and beta distribution

### Build Android App Bundle (Play Store)

```bash
# Build AAB for Google Play Store submission
eas build --platform android --profile production
```

**Rationale:** AAB format required for Play Store submissions  
**Reference:** [Publishing to Google Play Store](https://docs.expo.dev/submit/android/)

---

## iOS Build Commands

### Build iOS IPA (Internal Testing)

```bash
# Build iOS for internal testing (requires Apple Developer account)
eas build --platform ios --profile preview
```

**Rationale:** IPA format for TestFlight or direct installation  
**Reference:** [iOS Build Profiles](https://docs.expo.dev/build/building-on-ci/#ios-build-profiles)  
**Reference:** [Internal Distribution](https://docs.expo.dev/build/internal-distribution/)

### Build iOS for App Store

```bash
# Build iOS for App Store submission
eas build --platform ios --profile production
```

**Rationale:** Production build for App Store submission  
**Reference:** [Publishing to App Store](https://docs.expo.dev/submit/ios/)

---

## Build Management Commands

### List All Builds

```bash
# View all builds for the project
eas build:list
```

**Reference:** [EAS Build CLI Reference](https://docs.expo.dev/build-reference/eas-build/)

### View Build Details

```bash
# View specific build details
eas build:view [BUILD_ID]
```

### Cancel Build

```bash
# Cancel a running build
eas build:cancel [BUILD_ID]
```

### Download Build

```bash
# Download build artifact
eas build:download [BUILD_ID]
```

---

## Build Configuration

### eas.json Profiles Explained

- **development**: Development client build with Expo Go features
- **preview**: Internal testing build (APK for Android, IPA for iOS)
- **production**: Production build for store submission (AAB for Android, IPA for iOS)

**Reference:** [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)

---

## Common Workflows

### First Android Build (Recommended)

```bash
# 1. Setup (one-time)
npm install -g eas-cli
eas login
eas build:configure

# 2. Build APK for testing
eas build --platform android --profile preview

# 3. Wait for email notification
# 4. Download APK from provided link
# 5. Install on Android device
```

### Production Release Workflow

```bash
# 1. Update version in app.json
# 2. Build production version
eas build --platform android --profile production
eas build --platform ios --profile production

# 3. Submit to stores (optional)
eas submit --platform android
eas submit --platform ios
```

**Reference:** [EAS Submit](https://docs.expo.dev/submit/introduction/)

---

## Troubleshooting

### Check Build Status

```bash
# View latest builds
eas build:list

# Check build logs
eas build:view [BUILD_ID]
```

### Common Issues

1. **Build fails**: Check build logs in dashboard or via CLI
2. **Credentials error**: Run `eas credentials` to manage certificates
3. **Timeout**: Large projects may need longer build times

**Reference:** [EAS Build Troubleshooting](https://docs.expo.dev/build/troubleshooting/)

---

## Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Build Configuration](https://docs.expo.dev/build/eas-json/)
- [EAS Build CLI Reference](https://docs.expo.dev/build-reference/eas-build/)
- [Internal Distribution](https://docs.expo.dev/build/internal-distribution/)
- [Publishing Guides](https://docs.expo.dev/submit/introduction/)

---

## Notes

- EAS Build להפקת APK/IPA בקלות - Easy APK/IPA generation
- No local native setup required
- Cloud-based builds
- Automatic certificate management
- Supports both managed and bare workflows

