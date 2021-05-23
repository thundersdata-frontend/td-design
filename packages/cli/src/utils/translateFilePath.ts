'use strict';

/**
 * There are various files in the templates folder in the RN repo. We want
 * these to be ignored by tools when working with React Native itself.
 * Example: _babelrc file is ignored by Babel, renamed to .babelrc inside
 *          a real app folder.
 * This is especially important for .gitignore because npm has some special
 * behavior of automatically renaming .gitignore to .npmignore.
 */
export default function translateFilePath(path: string) {
  if (!path) {
    return path;
  }
  return path
    .replace('_BUCK', 'BUCK')
    .replace('_gitignore', '.gitignore')
    .replace('_gitattributes', '.gitattributes')
    .replace('_babel.config.js', 'babel.config.js')
    .replace('_babelrc', '.babelrc')
    .replace('_flowconfig', '.flowconfig')
    .replace('_buckconfig', '.buckconfig')
    .replace('_watchmanconfig', '.watchmanconfig');
}
