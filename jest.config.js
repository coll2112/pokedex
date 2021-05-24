const { pathsToModuleNameMapper } = require('ts-jest/utils')
const {
  compilerOptions: { paths }
} = require('./tsconfig')

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(css|scss)$': 'jest-css-modules-transform'
  },
  moduleDirectories: ['node_modules', 'src', '<rootdir>'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths),
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  modulePaths: ['<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{tss,tsx}', '!**/node_modules/**', '!**/pages/**']
}
