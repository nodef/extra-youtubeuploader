const download = require('download');
const cp = require('child_process');


// Global variables.
const RELEASE = '18.14';
const URLPREFIX = 'https://github.com/porjo/youtubeuploader/releases/download';
const ARCH = {
  arm: 'armv7',
  x64: 'amd64'
};
const PLATFORM = {
  darwin: 'mac',
  win32: 'windows'
};


// Get download URL.
function url() {
  var arch = ARCH[process.arch]||process.arch;
  var platform = PLATFORM[process.platform]||'linux';
  var ext = platform!=='linux'? '.zip':'.gz';
  return `${URLPREFIX}/${RELEASE}/youtubeuploader_${platform}_${arch}${ext}`;
};

// Main installer.
async function main() {
  await download(url(), __dirname, {extract: true});
  // cp.execSync('rm -rf node_nodules');
};
main();
