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
youtubeuploader.lines = lines;
module.exports = youtubeuploader;
