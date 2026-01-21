---
description: How to generate the Android APK for THE MARWAD FOOD ORDERING SYSTEM
---

This guide uses Capacitor to wrap the web application into a native Android APK.

### Prerequisites
- [Android Studio](https://developer.android.com/studio) installed on your machine.
- Android SDK and Command Line Tools configured.

### Steps to Generate APK

1. **Build the Web Project**
   Ensure the latest web changes are compiled:
   ```powershell
   npm run build
   ```

2. **Sync with Capacitor**
   Sync the compiled files from the `dist` folder to the Android project:
   ```powershell
   npx cap sync
   ```

3. **Open in Android Studio**
   Open the native Android project in Android Studio:
   ```powershell
   npx cap open android
   ```

4. **Build the APK in Android Studio**
   - Wait for Gradle to finish indexing/syncing.
   - In the top menu, go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - Once finished, a notification will appear. Click **locate** to find your `app-debug.apk`.

### Important Note on URL
Current APK is configured to load: `https://qr-ordering-app-12321.onrender.com`. If your server URL changes, update it in `capacitor.config.json` before running `npx cap sync`.
