module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {},
  },
  cacheDirectory: '.jest/cache',
};
