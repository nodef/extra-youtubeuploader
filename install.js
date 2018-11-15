const cp = require('child_process');


// Run a command, return true if success.
function cpRun(txt) {
  try { cp.execSync(txt, {stdio: []}); }
  catch(e) { return false; }
  return true;
};

// Setup "youtubeuploader".
function setup() {
  if(cpRun('youtubeuploader --version')) {
    console.log('extra: youtubeuploader already exists.');
    return;
  }
  console.log('extra: Using setup-youtubeuploader');
  cp.execSync('npm install -g setup-youtubeuploader', {stdio: [0, 1, 2]});
};
setup();
