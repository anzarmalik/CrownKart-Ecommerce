module.exports = {
  verbose: true,
  reporters: [
    'default',
    [
      // junit config options
      'jest-junit',
      {
        outputDirectory: 'tests/unit/out/',
      },
    ],
  ],
  setupFilesAfterEnv: ['./setup.js'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/setup.js', '<rootDir>/jest.config.js'],
};
