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
function options(o, k, a, i) {
  if(k==='--help') o.help = true;
  else if(k==='--version') o.version = true;
  else if(k==='-l' || k==='--log') o.log = true;
  else if(k==='-i' || k==='--id') o.id = a[++i];
  else if(k==='-v' || k==='--video') o.video = a[++i];
  else if(k==='-t' || k==='--thumbnail') o.thumbnail = a[++i];
  else if(k==='-c' || k==='--caption') o.caption = a[++i];
  else if(k==='-m' || k==='--meta') o.meta = a[++i];
  else if(k==='-d' || k==='--descriptionpath') o.descriptionpath = a[++i];
  else if(k==='-ci' || k==='--client_id') o.client_id = a[++i];
  else if(k==='-ct' || k==='--client_token') o.client_token = a[++i];
  else if(k==='-ot' || k==='--title') o.title = a[++i];
  else if(k==='-od' || k==='--description') o.description = a[++i];
  else if(k==='-ok' || k==='--tags') o.tags = a[++i];
  else if(k==='-ol' || k==='--language') o.language = a[++i];
  else if(k==='-oc' || k==='--category') o.category = a[++i];
  else if(k==='-op' || k==='--privacystatus') o.privacystatus = a[++i];
  else if(k==='-oe' || k==='--embeddable') o.embeddable = true;
  else if(k==='-ol' || k==='--license') o.license = a[++i];
  else if(k==='-os' || k==='--publicstatsviewable') o.publicstatsviewable = true;
  else if(k==='-opa' || k==='--publishat') o.publishat = a[++i];
  else if(k==='-ord' || k==='--recordingdate') o.recordingdate = a[++i];
  else if(k==='-opi' || k==='--playlistids') o.playlistids = a[++i];
  else if(k==='-opt' || k==='--playlisttitles') o.playlisttitles = a[++i];
  else if(k==='-ola' || k==='--location_latitude') o.location_latitude = a[++i];
  else if(k==='-olo' || k==='--location_longitude') o.location_longitude = a[++i];
  else if(k==='-old' || k==='--locationdescription') o.locationdescription = a[++i];
  else if(k==='-uc' || k==='--upload_chunk') o.upload_chunk = a[++i];
  else if(k==='-ur' || k==='--upload_rate') o.upload_rate = a[++i];
  else if(k==='-ut' || k==='--upload_time') o.upload_time = a[++i];
  else if(k==='-ap' || k==='--auth_port') o.auth_port = a[++i];
  else if(k==='-ah' || k==='--auth_headless') o.auth_headless = true;
  else o.input = a[i];
  return i+1;
};
youtubeuploader.lines = lines;
youtubeuploader.options = options;
module.exports = youtubeuploader;
