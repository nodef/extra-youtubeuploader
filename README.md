Upload YouTube videos with caption through machines (via ["youtubeuploader"]).

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


[![Merferry](https://i.imgur.com/HS08T0y.jpg)](https://merferry.github.io)

["youtubeuploader"]: https://github.com/porjo/youtubeuploader
