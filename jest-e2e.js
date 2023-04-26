module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*/*\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  preset: '@shelf/jest-mongodb',
  moduleNameMapper: {
    '^@main/(.*)$': '<rootDir>/apps/main/src/$1',
    '^@test/(.*)$': '<rootDir>/apps/main/test/$1',
  },
};
