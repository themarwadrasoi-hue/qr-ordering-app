---
description: How to deploy the QR Ordering App to Render and Android
---

# Deployment Guide

Follow these steps to deploy your changes to the live website and the Android app.

## 1. Deploy to Website (Render)
Render connects to your GitHub repository. To deploy:

1. **Push Changes**:
   ```powershell
   git add .
   git commit -m "Update features: menu selection and service please"
   git push origin main
   ```

2. **Check Render Dashboard**:
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Select your service: **marwad-rasoi-qr-ordering**
   - Click **Events** to see if the build has started.
   - If it doesn't start automatically, click **Manual Deploy** -> **Deploy latest commit**.

3. **Verify**:
   - Once the status is **Live**, visit your URL to see the new choice screen.

## 2. Update Android App (Capacitor)
To update the mobile app with the new menu screen:

// turbo
```powershell
# Build the web assets
npm run build

# Sync changes to the Android folder
npx cap sync android

# Open Android Studio to build the new APK
npx cap open android
```

> [!TIP]
> In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate the latest `.apk` file for your phone.
