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


## console

```bash
youtubeuploader -v video.mp4
# video.mp4 uploaded (yay!)

youtubeuploader -v video.mkv -yt "Me at the zoo" -yd "The first video on YouTube..."
# video.mkv uploaded with title and description

youtubeuploader -v video.mp4 -yp public
# video.mp4 uploaded as public video
```

### reference

```bash
youtubeuploader [options]
# --help: show this help
# -v, --video:     set input video file
# -t, --thumbnail: set input thumbnail file
# -c, --caption:   set input caption file
# -m, --meta:      set input meta file
# -l, --log:       enable log
# -ci, --client_id:    set client id credentials path (client_id.json)
# -ct, --client_token: set client token credentials path (client_token.json)
# -vt, --video_title:         set video title (video file)
# -vd, --video_description:   set video description (video file)
# -vk, --video_tags:          set video tags/keywords
# -vl, --video_language:      set video language (en)
# -vc, --video_category:      set video category id (22)
# -vp, --video_privacystatus: set video privacy status (public)
# -ve, --video_embeddable:    enable video to be embeddable (1)
# -vl, --video_license:       set video license (standard)
# -vs, --video_publicstatsviewable: enable public video stats to be viewable (1)
# -vpa, --video_publishat:          set video publish time
# -vrd, --video_recordingdate:  set video recording date
# -vpi, --video_playlistids:    set video playlist ids
# -vpt, --video_playlisttitles: set video playlist titles
# -vla, --video_location_latitude:   set video latitude coordinate
# -vlo, --video_location_longitude:  set video longitude coordinate
# -vld, --video_locationdescription: set video location description
# -uc, --upload_chunk:  set upload chunk size in bytes (8388608)
# -ur, --upload_rate:   set upload rate limit in kbps (no limit)
# -ut, --upload_time:   set upload time limit ex- "10:00-14:00"
# -ap, --auth_port:     set OAuth request port (8080)
# -ah, --auth_headless: enable browserless OAuth process

# Environment variables:
$YOUTUBEUPLOADER_LOG # enable log (0)
$YOUTUBEUPLOADER_CLIENT_ID    # set client id credentials path (client_id.json)
$YOUTUBEUPLOADER_CLIENT_TOKEN # set client token credentials path (client_token.json)
$YOUTUBEUPLOADER_VIDEO_TITLE         # set video title (video file)
$YOUTUBEUPLOADER_VIDEO_DESCRIPTION   # set video description (video file)
$YOUTUBEUPLOADER_VIDEO_TAGS          # set video tags/keywords
$YOUTUBEUPLOADER_VIDEO_LANGUAGE      # set video language (en)
$YOUTUBEUPLOADER_VIDEO_CATEGORY      # set video category id (22)
$YOUTUBEUPLOADER_VIDEO_PRIVACYSTATUS # set video privacy (public)
$YOUTUBEUPLOADER_VIDEO_EMBEDDABLE    # enable video to be embeddable (1)
$YOUTUBEUPLOADER_VIDEO_LICENSE       # set video license (standard)
$YOUTUBEUPLOADER_VIDEO_PUBLICSTATSVIEWABLE # enable public video stats to be viewable (1)
$YOUTUBEUPLOADER_VIDEO_PUBLISHAT           # set video publish time
$YOUTUBEUPLOADER_VIDEO_RECORDINGDATE  # set video recording date
$YOUTUBEUPLOADER_VIDEO_PLAYLISTIDS    # set video playlist ids
$YOUTUBEUPLOADER_VIDEO_PLAYLISTTITLES # set video playlist titles
$YOUTUBEUPLOADER_VIDEO_LOCATION_LATITUDE   # set video latitude coordinate
$YOUTUBEUPLOADER_VIDEO_LOCATION_LONGITUDE  # set video longitude coordinate
$YOUTUBEUPLOADER_VIDEO_LOCATIONDESCRIPTION # set video location description
$YOUTUBEUPLOADER_UPLOAD_CHUNK  # set upload chunk size in bytes (8388608)
$YOUTUBEUPLOADER_UPLOAD_RATE   # set upload rate limit in kbps (no limit)
$YOUTUBEUPLOADER_UPLOAD_TIME   # set upload time limit ex- "10:00-14:00"
$YOUTUBEUPLOADER_AUTH_PORT     # set OAuth request port (8080)
$YOUTUBEUPLOADER_AUTH_HEADLESS # enable browserless OAuth process
```


## package


```javascript
const youtubeuploader = require('extra-youtubeuploader');

youtubeuploader();
```


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
