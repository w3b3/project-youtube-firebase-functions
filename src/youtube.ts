require('dotenv').config();

// below https://developers.google.com/youtube/v3/quickstart/nodejs
let fs = require('fs');
let readline = require('readline');
let { google } = require('googleapis');
let OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
let SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
let TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  '/.credentials/';
let TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

//NOTE: Hard coding credentials in my local ENV
const CREDENTIALS = {
  clientSecret: process.env.clientSecret,
  clientId: process.env.clientId,
  redirectUrl: process.env.redirectUrl,
};
// Authorize a client with the loaded credentials, then call the YouTube API.
authorize(CREDENTIALS, getChannel);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(
  credentials: { clientSecret: any; clientId: any; redirectUrl: any },
  callback: { (auth: any): void; (arg0: any): void }
) {
  const clientSecret = credentials.clientSecret;
  const clientId = credentials.clientId;
  const redirectUrl = credentials.redirectUrl;
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err: boolean, token: string) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(
  oauth2Client: {
    generateAuthUrl: (arg0: { access_type: string; scope: string[] }) => any;
    getToken: (arg0: any, arg1: (err: any, token: any) => void) => void;
    credentials: any;
  },
  callback: { (auth: any): void; (arg0: any): void; (arg0: any): void }
) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', function (code: any) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token: any) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth: any) {
  const service = google.youtube('v3');
  service.channels.list(
    {
      auth: auth,
      part: 'snippet,contentDetails,statistics',
      mine: true,
    },
    function (err: string, response: { data: { items: any } }) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      const channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log(
          "This channel's ID is %s. Its title is '%s', and " +
            'it has %s views.',
          channels[0].id,
          channels[0].snippet.title,
          channels[0].statistics.viewCount
        );
      }
    }
  );
}
// above https://developers.google.com/youtube/v3/quickstart/nodejs
