# Firebase Security Notes

This project now expects dashboard admins to be explicitly allowlisted in Firestore.

## Admin access

Create one document per admin in the `admins` collection:

- Document ID: the Firebase Auth user UID
- Suggested fields: `email`, `name`, `createdAt`

Example path:

`admins/<firebase-auth-uid>`

Only users with a matching `admins/{uid}` document can read or modify protected Firestore data or upload to Firebase Storage.

## Public forms

The public website can still create:

- `bookings`
- `contactSubmissions`

Those writes are now limited to the exact fields the site submits, with type and length checks, so random authenticated users cannot use dashboard-level permissions to edit data.

## Storage

- Files under `gallery/` remain publicly readable for the website gallery.
- All writes require an allowlisted admin.
- Any non-gallery storage paths are now admin-only for both read and write.

## After updating rules

Deploy the rules to Firebase so the live project matches this repo:

`firebase deploy --only firestore:rules,storage`
