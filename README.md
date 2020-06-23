# Youtube API (with Firebase)

In this repo, we use firebase to manipulate Youtube API:

- Functions: enable us to have our own proxy API

- Firestore: enable us register and manipulate permanent data

## Get started

- `npm i`
- `npm run serve` - builds the code and runs the [emulator](http://localhost:4000/)

## API

## receiveQueryAndFirestoreIt 

- endpoint (no YT feat here) to demo *Functions* and *Firestore*. 
- Does exactly what it says (receives `q` in the body - if not, return *400*).

## retrieveSubscriptionsForUser 

- *Authenticate user with Google*.
- **Retrieve user's Youtube subscriptions to channels**.
- Saves `{q: {...}}` to Firestore (through [receiveQueryAndFirestoreIt](http://localhost:5001/api-secret-keeper/us-central1/receiveQueryAndFirestoreIt)). Using [got](https://www.npmjs.com/package/got#comparison) package ~~instead of axios~~
- Returns list.

# TODO

## Split function into multiple files
index.ts
```js
const foo = require('./foo');
const bar = require('./bar');
exports.foo = foo.foo;
exports.bar = bar.bar;
```

foo.ts
```js
const functions = require('firebase-functions');
exports.foo = functions.https.onRequest((request, response) => {
  // ...
});
```

# NOTES

## [Firebase emulator](https://firebase.google.com/docs/functions/local-emulator#windows)

For every environment variable to work with local emulator, first run this
`firebase functions:config:get > .runtimeconfig.json`

## ...
