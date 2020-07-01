# Youtube API (with Firebase)

In this repo, we use firebase to manipulate Youtube API:

- Functions: enable us to have our own proxy API

- Firestore: enable us register and manipulate permanent data

## Get started

- If it is the first time running this code, go for `npm i`
- `npm start` - builds the code and runs the [emulators](http://localhost:4000/)

## API

## receiveQueryAndFirestoreIt 

- endpoint (no YT feat here) to demo *Functions* and *Firestore*. 
- Does exactly what it says (receives `q` in the body - if not, return *400*).

## retrieveSubscriptionsForUser 

- TODO: *Authenticate user with Google*.
- TODO: **Retrieve user's Youtube subscriptions to channels**.
- Saves `{q: {...}}` to Firestore (through receiveQueryAndFirestoreIt. Using [got](https://www.npmjs.com/package/got#comparison) package ~~instead of axios~~
- Returns list.

# TODO

- Youtube API integration

# NOTES

## [Firebase emulator](https://firebase.google.com/docs/functions/local-emulator#windows)

For every environment variable to work with local emulator, first run this
`firebase functions:config:get > .runtimeconfig.json`
