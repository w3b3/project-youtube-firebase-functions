import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const got = require('got').default; //Error if not CommonJS https://github.com/axios/axios#note-commonjs-usage

admin.initializeApp();

// TODO: [HOW?] replace IN DEV ONLY the api.base_url WITH url in ./.env => DEV_BASE_URL
const BASE_URL = functions.config().api.base_url;

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
        const subscriptions = [12, 345, 6789];
        // save the list of subscriptions in Firestore
        const r = {userId, subscriptions};
        got(`${BASE_URL}receiveQueryAndFirestoreIt`, {
            method: 'POST', json: {q: r}, responseType: 'json'
        });
        // TODO: return list of subscriptions
        response.json({
            subscriptions
        });
    } else {
        response.status(400).end();
    }
});
