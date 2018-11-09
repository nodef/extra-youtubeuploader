const cp = require('child_process');


// Global variables.
const STDIO = [0, 1, 2];


 // Generate command for youtubeuploader.
 function command(o) {
  var z = 'youtubeuploader';
  var o = o||{}, stdio = STDIO;
  for(var k in o) {
    if(o[k]==null) continue;
    if(k==='stdio') continue;
    if(typeof o[k]==='boolean') z += o[k]? ` -${k}`:'';
    else z += ` -${k} ${JSON.stringify(o[k])}`;
  }
  return z;
};

/**
 * Invoke "youtubeuploader" synchronously.
 * @param {object} o upload options.
 */
function sync(o) {
  var stdio = o.stdio===undefined? STDIO:o.stdio;
  return cp.execSync(command(o), {stdio});
};

/**
 * Invoke "youtubeuploader" asynchronously.
 * @param {object} o upload options.
 */
function youtubeuploader(o) {
  var stdio = o.stdio===undefined? STDIO:o.stdio;
  return new Promise((fres, frej) => cp.exec(command(o), {stdio}, (err, stdout, stderr) => {
    if(err) frej(err);
    else fres({stdout, stderr});
  }));
};
youtubeuploader.sync = sync;
module.exports = youtubeuploader;
