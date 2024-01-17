import type { Config } from 'jest'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  maxWorkers: 1,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'main.ts',
    '\\.dto\\.ts$',
    '\\.module\\.ts$',
    '/jest/',
  ],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  coverageProvider: 'babel',
  coverageThreshold: {
    global: {
      statements: 84,
      branches: 65.7,
      functions: 82.6,
      lines: 83.5,
    },
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}

export default config
