const cp = require('child_process');


// Global variables.
const STDIO = [0, 1, 2];


// Generate flags for console.
function flags(o, pre='', z='') {
  for(var k in o) {
    if(o[k]==null || k==='stdio') continue;
    if(Array.isArray(o[k])) z += ` --${pre}${k} "${o[k].join()}"`;
    else if(typeof o[k]==='object') z = flags(o[k], `${pre}${k}_`, z);
    else if(typeof o[k]==='boolean') z += o[k]? ` --${pre}${k}`:'';
    else z += ` --${pre}${k} ${JSON.stringify(o[k])}`;
  }
  return z;
}

/**
 * Invoke "youtubeuploader".
 * @param {object} o upload options.
 */
function youtubeuploader(o) {
  var o = o||{}, cmd = 'youtubeuploader'+flags(o);
  var stdio = o.log || o.stdio==null? STDIO:o.stdio;
  if(stdio===STDIO) return Promise.resolve({stdout: cp.execSync(cmd, {stdio})});
  return new Promise((fres, frej) => cp.exec(cmd, {stdio}, (err, stdout, stderr) => {
    return err? frej(err):fres({stdout, stderr});
  }));
};

/**
 * Invoke "youtubeuploader", and get stdout lines.
 * @param {object} o upload options.
 */
async function lines(o) {
  var {stdout} = await youtubeuploader(Object.assign({}, o, {stdio: []}));
  var out = stdout.toString().trim();
  return out? out.split('\n'):[];
};

// Get options from arguments.
function options(a, z={}) {
  for(var i=2, I=a.length; i<I; i++) {
    if(a[i]==='--help') z.help = true;
    else if(a[i]==='--version') z.version = true;
    else if(a[i]==='-l' || a[i]==='--log') z.log = true;
    else if(a[i]==='-i' || a[i]==='--id') z.id = a[++i];
    else if(a[i]==='-v' || a[i]==='--video') z.video = a[++i];
    else if(a[i]==='-t' || a[i]==='--thumbnail') z.thumbnail = a[++i];
    else if(a[i]==='-c' || a[i]==='--caption') z.caption = a[++i];
    else if(a[i]==='-m' || a[i]==='--meta') z.meta = a[++i];
    else if(a[i]==='-d' || a[i]==='--descriptionpath') z.descriptionpath = a[++i];
    else if(a[i]==='-ci' || a[i]==='--client_id') z.client_id = a[++i];
    else if(a[i]==='-ct' || a[i]==='--client_token') z.client_token = a[++i];
    else if(a[i]==='-ot' || a[i]==='--title') z.title = a[++i];
    else if(a[i]==='-od' || a[i]==='--description') z.description = a[++i];
    else if(a[i]==='-ok' || a[i]==='--tags') z.tags = a[++i];
    else if(a[i]==='-ol' || a[i]==='--language') z.language = a[++i];
    else if(a[i]==='-oc' || a[i]==='--category') z.category = a[++i];
    else if(a[i]==='-op' || a[i]==='--privacystatus') z.privacystatus = a[++i];
    else if(a[i]==='-oe' || a[i]==='--embeddable') z.embeddable = true;
    else if(a[i]==='-ol' || a[i]==='--license') z.license = a[++i];
    else if(a[i]==='-os' || a[i]==='--publicstatsviewable') z.publicstatsviewable = true;
    else if(a[i]==='-opa' || a[i]==='--publishat') z.publishat = a[++i];
    else if(a[i]==='-ord' || a[i]==='--recordingdate') z.recordingdate = a[++i];
    else if(a[i]==='-opi' || a[i]==='--playlistids') z.playlistids = a[++i];
    else if(a[i]==='-opt' || a[i]==='--playlisttitles') z.playlisttitles = a[++i];
    else if(a[i]==='-ola' || a[i]==='--location_latitude') z.location_latitude = a[++i];
    else if(a[i]==='-olo' || a[i]==='--location_longitude') z.location_longitude = a[++i];
    else if(a[i]==='-old' || a[i]==='--locationdescription') z.locationdescription = a[++i];
    else if(a[i]==='-uc' || a[i]==='--upload_chunk') z.upload_chunk = a[++i];
    else if(a[i]==='-ur' || a[i]==='--upload_rate') z.upload_rate = a[++i];
    else if(a[i]==='-ut' || a[i]==='--upload_time') z.upload_time = a[++i];
    else if(a[i]==='-ap' || a[i]==='--auth_port') z.auth_port = a[++i];
    else if(a[i]==='-ah' || a[i]==='--auth_headless') z.auth_headless = true;
    else z.input = a[i];
  }
  return z;
};
youtubeuploader.lines = lines;
youtubeuploader.options = options;
module.exports = youtubeuploader;
