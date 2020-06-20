import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// Authentication => identity.
// Authorization => permissions.
export const yt = functions.https.onRequest(async (request, response) => {
  const key1 = request.body.key1 || `No "key1" was received.`;
  const fullBody = JSON.stringify(request.body);
  const firestoreInstance = await admin.firestore();
  const firestoreAdd = await firestoreInstance
    .collection('youtube-queries')
    .add({ key1: key1, fullBody: fullBody });
  // const saveQueryToFirebase = await admin.firestore().collection('youtube-queries').add({query: requestText});
  response.json({
    result: `Key #1: ${key1} -- Firestore key: ${firestoreAdd.id}`,
  });
});
