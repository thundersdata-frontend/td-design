const standardVersion = require('standard-version');

standardVersion({
  noVerify: true,
  infile: 'docs/changelog.md',
  silent: true,
  preset: 'custom-config',
  sameFile: true,
});
