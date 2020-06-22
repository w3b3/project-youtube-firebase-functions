# Youtube API (with Firebase)

In this repo, we use firebase to manipulate Youtube API:

- Functions: enable us to have our own proxy API

- Firestore: enable us register and manipulate permanent data

## Get started

- `npm i`
- `npm run serve` - builds the code and runs the [emulator](http://localhost:4000/)

## API

## [receiveQueryAndFirestoreIt](http://localhost:5001/api-secret-keeper/us-central1/receiveQueryAndFirestoreIt) 

- endpoint (no YT feat here) to demo *Functions* and *Firestore*. 
- Does exactly what it says (receives `q` in the body - if not, return *400*).

## [retrieveSubscriptionsForUser](http://localhost:5001/api-secret-keeper/us-central1/retrieveSubscriptionsForUser) 

- *Authenticate user*.
- **Retrieve list of subscriptions for the user**.
- Returns list.