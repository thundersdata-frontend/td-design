/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const extraNodeModules = {
  '@td-design/react-native': path.resolve(__dirname, '../components'),
};
const watchFolders = [path.resolve(__dirname, '../components')];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  projectRoot: path.resolve(__dirname),
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => (name in target ? target[name] : path.join(process.cwd(), `./node_modules/${name}`)),
    }),
  },
  watchFolders,
};
