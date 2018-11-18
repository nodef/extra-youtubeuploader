const cp = require('child_process');


// Setup "youtubeuploader".
function setup() {
  console.log('extra: Using setup-youtubeuploader');
  cp.execSync('npm install -g setup-youtubeuploader', {stdio: [0, 1, 2]});
};
setup();
