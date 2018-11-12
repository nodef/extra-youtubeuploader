Upload YouTube videos with caption through machines (via ["youtubeuploader"]).
<br>


## setup

### install

1. Install [Node.js], if not installed.
2. Run `npm install -g extra-youtubeuploader` in [console].


### get client id

1. Create an [account] on [Google Cloud Platform].
2. Create a [new project], and select it.
3. Enable [YouTube Data API] for the project.
4. Add [credentials] to your project.
5. Which API are you using? `YouTube Data API v3`.
6. Where will you be calling the API from? `Web server`.
7. What data will you be accessing? `User data`.
8. Select `What credentials do I need?`.
9. Create an OAuth 2.0 client ID.
10. Name: `youtubeuploader` (your choice).
11. Authorized JavaScript origins: `http://localhost:8080`.
12. Authorized redirect URIs: `http://localhost:8080/oauth2callback`.
13. Select `Create OAuth client ID`.
14. Set up the OAuth 2.0 consent screen.
15. Email address: (it should be correct).
16. Product name shown to users: `youtubeuploader` (your choice).
17. Select `Continue`.
18. Download credentials.
19. Select `Download`, then `Done`.
21. Copy downloaded file (`client_id.json`) to a directory.


### get client token

1. Open [console] in the above directory.
2. Run `youtubeuploader -v client_id.json`.
3. OAuth page will be opened in browser.
3. Choose an account, videos will be uploaded here.
4. `youtubeuploader` wants to access your Google Account.
5. Select `Allow`, and close browser window.
6. `client_token.json` should be created.
<br>


```javascript
const youtubeuploader = require('extra-youtubeuploader');
// youtubeuploader.sync(<options>): stdout when done
// youtubeuploader(<options>)
// -> Promise {stdout, stderr} when done

// <options>: {
//   cache:       // Token cache file ('request.token')
//   caption:     // Caption to upload. Can be a URL
//   categoryId:  // Video category Id
//   chunksize:   // Size (in bytes) of each upload chunk. A zero value will cause all data to be uploaded in a single request (8388608)
//   description:  // Video description ('uploaded by youtubeuploader')
//   filename:     // Filename to upload. Can be a URL
//   headlessAuth: // Set this if no browser available for the oauth authorisation step
//   language:     // Video language ('en')
//   limitBetween: // Only rate limit between these times e.g. 10:00-14:00 (local time zone)
//   metaJSON:     // JSON file containing title,description,tags etc (optional)
//   oAuthPort:    // TCP port to listen on when requesting an oAuth token (8080)
//   privacy:      // Video privacy status ('private')
//   quiet:        // Suppress progress indicator
//   ratelimit:    // Rate limit upload in kbps. No limit by default
//   secrets:      // Client Secrets configuration ('client_secrets.json')
//   tags:         // Comma separated list of video tags
//   thumbnail:    // Thumbnail to upload. Can be a URL
//   title:        // Video title ('Video Title')
//   v:            // Show version
// }


youtubeuploader.sync({filename: 'video.mp4'});
// upload video.mp4 (secrets: client_secrets.json, cache: request.token)

var secrets = 'C:\\Users\\wolfram77\\.google\\client_secrets.json';
var cache = 'C:\\Users\\wolfram77\\.google\\request.token';
youtubeuploader.sync({secrets, cache, filename: 'video.mkv'});
// upload video.mkv with custom secrets, cache

var title = 'Me at the zoo';
var description = 'The first video on YouTube...';
youtubeuploader.sync({secrets, cache, filename: 'zoo.avi', title, description});

/* zoo-meta.json: {title, description, privacy: 'public'} */
var metaJSON = 'C:\\Base\\zoo-meta.json';
youtubeuploader.sync({secrets, cache, filename: 'zoo.avi', metaJSON});
// upload zoo.avi with metaJSON (details at "youtubeuploader")

/* caption: All right so here we are infront of the elepants... */
var caption = 'C:\\Base\\zoo-caption.txt';
youtubeuploader.sync({secrets, cache, filename: 'zoo.avi', metaJSON, caption});
// upload zoo.avi with caption
```


[![nodef](https://i.imgur.com/HS08T0y.jpg)](https://nodef.github.io)

["youtubeuploader"]: https://github.com/golangf/youtubeuploader
[setup-youtubeuploader]: https://www.npmjs.com/package/setup-youtubeuploader

[Node.js]: https://nodejs.org/en/download/
[console]: https://en.wikipedia.org/wiki/Shell_(computing)#Text_(CLI)_shells
[account]: https://accounts.google.com/signup
[Google Cloud Platform]: https://console.developers.google.com/
[new project]: https://console.cloud.google.com/projectcreate
[YouTube Data API]: https://console.cloud.google.com/apis/library/youtube.googleapis.com
[credentials]: https://console.cloud.google.com/apis/credentials/wizard
