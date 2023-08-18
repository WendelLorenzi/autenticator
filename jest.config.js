/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.ts"
  ],
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"]
};