const standardVersion = require('standard-version');

standardVersion({
  noVerify: true,
  infile: 'CHANGELOG.md',
  silent: true,
  preset: 'custom-config',
  sameFile:  true,
});