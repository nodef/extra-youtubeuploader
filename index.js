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

 // Generate command for youtubeuploader.
 function command(o) {
  return 'youtubeuploader'+flags(o||{});
};

/**
 * Invoke "youtubeuploader" synchronously.
 * @param {object} o upload options.
 */
function sync(o) {
  var stdio = o.log || o.stdio===undefined? STDIO:o.stdio;
  return cp.execSync(command(o), {stdio});
};

/**
 * Invoke "youtubeuploader" asynchronously.
 * @param {object} o upload options.
 */
function youtubeuploader(o) {
  var stdio = o.log || o.stdio===undefined? STDIO:o.stdio;
  return new Promise((fres, frej) => cp.exec(command(o), {stdio}, (err, stdout, stderr) => {
    if(err) frej(err);
    else fres({stdout, stderr});
  }));
};
youtubeuploader.sync = sync;
module.exports = youtubeuploader;
