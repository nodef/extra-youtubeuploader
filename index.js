const cp = require('child_process');


/**
 * Invoke "youtubeuploader" (child process).
 * - cache (string): Token cache file (default "request.token")
 * - caption (string): Caption to upload. Can be a URL
 * - categoryId (string): Video category Id
 * - chunksize (int): size (in bytes) of each upload chunk. A zero value will cause all data to be uploaded in a single request (default 8388608)
 * - description (string): Video description (default "uploaded by youtubeuploader")
 * - filename (string): Filename to upload. Can be a URL
 * - headlessAuth: set this if no browser available for the oauth authorisation step
 * - language (string): Video language (default "en")
 * - limitBetween (string): Only rate limit between these times e.g. 10:00-14:00 (local time zone)
 * - metaJSON (string): JSON file containing title,description,tags etc (optional)
 * - oAuthPort (int): TCP port to listen on when requesting an oAuth token (default 8080)
 * - privacy (string): Video privacy status (default "private")
 * - quiet: Suppress progress indicator
 * - ratelimit (int): Rate limit upload in kbps. No limit by default
 * - secrets (string): Client Secrets configuration (default "client_secrets.json")
 * - tags (string): Comma separated list of video tags
 * - thumbnail (string): Thumbnail to upload. Can be a URL
 * - title (string): Video title (default "Video Title")
 * - v: show version
 * @param {object} o upload options.
 */
function youtubeuploader(o) {
  var z = 'youtubeuploader', o = o||{};
  var stdio = o.stdio||[0, 1, 2];
  for(var k in o) {
    if(o[k]==null) continue;
    if(k==='stdio') continue;
    if(typeof o[k]==='boolean') z += o[k]? ` -${k}`:'';
    else z += ` -${k} ${JSON.stringify(o[k])}`;
  }
  return new Promise((fres, frej) => cp.exec(z, {stdio}, (err, stdout, stderr) => {
    if(err) frej(err);
    else fres({stdout, stderr});
  }));
};
module.exports = youtubeuploader;
