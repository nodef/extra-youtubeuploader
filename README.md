Upload YouTube videos with caption through machines (via ["youtubeuploader"]).
> Do you want to:
> - Upload your AI generated video to YouTube?
> - Or, [Upload Wikipedia TTS videos on YouTube]?

Sample: ["Pixelsphere OST (2017)"]. 
<br>


## setup

### install

1. Install [Node.js], if not installed.
2. Run `npm install -g extra-youtubeuploader` in [console].
3. To install this as a package use `npm install extra-youtubeuploader`.
> ["youtubeuploader"] is installed by [setup-youtubeuploader], if not available.


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

youtubeuploader -v video.mkv -ot "Me at the zoo" -od "The first video on YouTube..."
# video.mkv uploaded with title and description

youtubeuploader -v video.mp4 -op public -l
# video.mp4 uploaded as public video (log enabled)

youtubeuploader -ot "Me at the zoo"
# get video id from title

youtubeuploader -i "jNQXAC9IVRw" -ot "Elephants at zoo"
# update video title "Me at the zoo" -> "Elephants at zoo"

youtubeuploader -i "jNQXAC9IVRw" -c "odia.txt" -ol "or"
# upload odia captions for the video
```

### reference

```bash
youtubeuploader [options]
# --help:    show help
# --version: show version
# -l, --log:       enable log
# -i, --id:        set video id (for update)
# -v, --video:     set input video file/URL
# -t, --thumbnail: set input thumbnail file/URL
# -c, --caption:   set input caption file/URL
# -m, --meta:      set input meta file
# -d, --descriptionpath: set input description file
# -ci, --client_id:      set client id credentials path (client_id.json)
# -ct, --client_token:   set client token credentials path (client_token.json)
# -ot, --title:         set title (video)
# -od, --description:   set description (video)
# -ok, --tags:          set tags/keywords
# -ol, --language:      set language (en)
# -oc, --category:      set category (people and blobd)
# -op, --privacystatus: set privacy status (public)
# -oe, --embeddable:    enable to be embeddable
# -ol, --license:       set license (standard)
# -os, --publicstatsviewable: enable public stats to be viewable
# -opa, --publishat:          set publish time
# -ord, --recordingdate:  set recording date
# -opi, --playlistids:    set playlist ids
# -opt, --playlisttitles: set playlist titles
# -ola, --location_latitude:   set latitude coordinate
# -olo, --location_longitude:  set longitude coordinate
# -old, --locationdescription: set location description
# -uc, --upload_chunk:  set upload chunk size in bytes (8388608)
# -ur, --upload_rate:   set upload rate limit in kbps (no limit)
# -ut, --upload_time:   set upload time limit ex- "10:00-14:00"
# -ap, --auth_port:     set OAuth request port (8080)
# -ah, --auth_headless: enable browserless OAuth process

# Environment variables:
$YOUTUBEUPLOADER_LOG # enable log (0)
$YOUTUBEUPLOADER_VIDEO     # set input video file
$YOUTUBEUPLOADER_THUMBNAIL # set input thumbnail file
$YOUTUBEUPLOADER_CAPTION   # set input caption file
$YOUTUBEUPLOADER_META      # set input meta file
$YOUTUBEUPLOADER_DESCRIPTIONPATH # set input description file
$YOUTUBEUPLOADER_CLIENT_ID       # set client id credentials path (client_id.json)
$YOUTUBEUPLOADER_CLIENT_TOKEN    # set client token credentials path (client_token.json)
$YOUTUBEUPLOADER_TITLE         # set title (file)
$YOUTUBEUPLOADER_DESCRIPTION   # set description (file)
$YOUTUBEUPLOADER_TAGS          # set tags/keywords
$YOUTUBEUPLOADER_LANGUAGE      # set language (en)
$YOUTUBEUPLOADER_CATEGORY      # set category id (22)
$YOUTUBEUPLOADER_PRIVACYSTATUS # set privacy (public)
$YOUTUBEUPLOADER_EMBEDDABLE    # enable to be embeddable (0)
$YOUTUBEUPLOADER_LICENSE       # set license (standard)
$YOUTUBEUPLOADER_PUBLICSTATSVIEWABLE # enable public stats to be viewable (0)
$YOUTUBEUPLOADER_PUBLISHAT           # set publish time
$YOUTUBEUPLOADER_RECORDINGDATE  # set recording date
$YOUTUBEUPLOADER_PLAYLISTIDS    # set playlist ids
$YOUTUBEUPLOADER_PLAYLISTTITLES # set playlist titles
$YOUTUBEUPLOADER_LOCATION_LATITUDE   # set latitude coordinate
$YOUTUBEUPLOADER_LOCATION_LONGITUDE  # set longitude coordinate
$YOUTUBEUPLOADER_LOCATIONDESCRIPTION # set location description
$YOUTUBEUPLOADER_UPLOAD_CHUNK  # set upload chunk size in bytes (8388608)
$YOUTUBEUPLOADER_UPLOAD_RATE   # set upload rate limit in kbps (no limit)
$YOUTUBEUPLOADER_UPLOAD_TIME   # set upload time limit ex- "10:00-14:00"
$YOUTUBEUPLOADER_AUTH_PORT     # set OAuth request port (8080)
$YOUTUBEUPLOADER_AUTH_HEADLESS # enable browserless OAuth process (0)
```

```javascript
// META file (.json)
// - specified using -m/--meta
// - all fields are optional
{
  "title": "How Risky Is The Stock Market?",
  "description": "Have you ever thought about investing ...",
  "tags": ["stock marketing", "risk management"],
  "privacyStatus": "public",
  "embeddable": true,
  "license": "creativeCommon",
  "publicStatsViewable": true,
  "publishAt": "2017-06-01T12:05:00+02:00",
  "categoryId": "10",
  "recordingdate": "2017-05-21",
  "location": {
    "latitude": 48.8584,
    "longitude": 2.2945
  },
  "locationDescription":  "Bombay Stock Exchange",
  "playlistIds":  ["xxxxxxxxxxxxxxxxxx", "yyyyyyyyyyyyyyyyyy"],
  "playlistTitles":  ["my test playlist"],
  "language":  "en"
}
```
<br>


## package


```javascript
const youtubeuploader = require('extra-youtubeuploader');

await youtubeuploader({video: 'video.mp4'})
// video.mp4 uploaded (yay!)

await youtubeuploader({video: 'video.mkv', title: 'Me at the zoo',
  description: 'The first video on YouTube...'});
// video.mkv uploaded with title and description

youtubeuploader.sync({video: 'video.mp4', privacystatus: 'public', log: true});
// video.mp4 uploaded as public video (log enabled)

var stdout = youtubeuploader.sync({title: 'Me at the zoo', stdio: null});
var ids = stdout.toString().trim().split('\n');
// get video ids from title

var id = ids[0];
await youtubeuploader({id, title: 'Elephants at zoo'});
// update video title "Me at the zoo" -> "Elephants at zoo"

await youtubeuploader({id, caption: 'odia.txt', language: 'or'});
// upload odia captions for the video
```

### reference

```javascript
const youtubeuploader = require('extra-youtubeuploader');

youtubeuploader.sync(options={})
// options: same as flags given above
// -> stdout

youtubeuploader(options={})
// options: same as flags given above
// -> Promise {stdout, stderr}
```
<br>


## similar

Do you need anything similar?
- [extra-stillvideo] can generate video from audio and image.
- [extra-googletts] can generate spoken audio from text.
<br><br>


[![nodef](https://i.imgur.com/HS08T0y.jpg)](https://nodef.github.io)

[Upload Wikipedia TTS videos on YouTube]: https://www.youtube.com/results?search_query=wikipedia+audio+article
["Pixelsphere OST (2017)"]: https://www.youtube.com/watch?v=RCryNyHbSDc&list=PLNEveYilIj1AV5-ETDCHufWazEHRcP8o-

[extra-stillvideo]: https://www.npmjs.com/package/extra-stillvideo
[extra-googletts]: https://www.npmjs.com/package/extra-googletts
[Node.js]: https://nodejs.org/en/download/

[releases]: https://github.com/golangf/youtubeuploader/releases
[console]: https://en.wikipedia.org/wiki/Shell_(computing)#Text_(CLI)_shells
[account]: https://accounts.google.com/signup
[Google Cloud Platform]: https://console.developers.google.com/
[new project]: https://console.cloud.google.com/projectcreate
[YouTube Data API]: https://console.cloud.google.com/apis/library/youtube.googleapis.com
[credentials]: https://console.cloud.google.com/apis/credentials/wizard

["youtubeuploader"]: https://github.com/golangf/youtubeuploader
[setup-youtubeuploader]: https://www.npmjs.com/package/setup-youtubeuploader
