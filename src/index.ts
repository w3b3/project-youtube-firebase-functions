import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

//TODO: fix this with some ENV
// const BASE_URL = 'http://localhost:5001/api-secret-keeper/us-central1/';

export const receiveQueryAndFirestoreIt = functions.https.onRequest(async (request, response) => {
    const q = request.body.q;
    if (q) {
        await admin.firestore().collection('queries')
            .add({q});
        response.json({
            q
        });
    } else {
        response.status(400).end();
    }
});

// Authentication => identity.
// Authorization => permissions.
export const retrieveSubscriptionsForUser = functions.https.onRequest(async (request, response) => {
    //TODO: authenticate user
    const userId = await Promise.resolve('test-user');
    //TODO: get user ID
    if (userId) {
        //TODO: call Youtube API to get list of subscriptions
        const subscriptions = {userId}; //DEBUG
        // TODO: save the list of subscriptions in Firestore
        //  fetch(`${receiveQueryAndFirestoreIt}receiveQueryAndFirestoreIt`, {q: subscriptions})
        // TODO: return list of subscriptions
        response.json({
            subscriptions
        });
    } else {
        response.status(400).end();
    }
});
