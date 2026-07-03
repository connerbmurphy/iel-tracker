# IEL Field Cost Log — PWA

Real-time job costing app for Incredible Edible Landscapes install crews.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your GitHub repo
3. Framework preset: **Create React App**
4. Click Deploy — done

## Firestore Security Rules

In Firebase Console → Firestore → Rules, paste the contents of `firestore.rules` and publish.

## Adding a device (foreman's phone, your phone)

1. Open the Vercel URL in Safari
2. Create a new account with any email/password
3. Share that email/password with the device that should have access
4. Tap Share → Add to Home Screen in Safari to install as an app

## Data

All data is stored in Firestore under each account's UID. Each device account
sees its own isolated data — share the same login credentials across devices
that should share the same job data.
