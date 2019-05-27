module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['app/**/*.js', '!**/*.test.js', '!app/.next/**/*'],
  setupFiles: ['raf/polyfill', './testSetup'],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: ['<rootDir>/app/.next/'],
};
