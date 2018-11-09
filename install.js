const cp = require('child_process');


// Run a command, return true if success.
function cpRun(txt) {
  try { cp.execSync(txt, {stdio: []}); }
  catch(e) { return false; }
  return true;
};

// Setup "youtubeuploader".
function setup() {
  if(cpRun('youtubeuploader -v')) return;
  cpRun('npm install -g setup-youtubeuploader');
};
setup();
