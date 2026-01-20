---
description: How to deploy the QR Ordering App to Render and Android
---

# Deployment Guide

Follow these steps to deploy your changes to the live website and the Android app.

## 1. Deploy to Website (Render)
If your project is connected to GitHub and Render, simply push your changes:

```powershell
git add .
git commit -m "Add menu selection and service please feature"
git push origin main
```
*Render will automatically start building the new version.*

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
