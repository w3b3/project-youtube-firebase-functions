import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// Authentication => identity.
// Authorization => permissions.
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
