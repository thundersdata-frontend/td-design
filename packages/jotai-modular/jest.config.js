module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['./setup.js'],
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {},
  },
  cacheDirectory: '.jest/cache',
};
