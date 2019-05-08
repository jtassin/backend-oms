module.exports = {
  displayName: 'test',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 84,
      lines: 86,
      statements: 86,
    },
  },
  coverageReporters: ['json', 'html'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.js'],
};
