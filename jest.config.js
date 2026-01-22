const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  testMatch: ['<rootDir>/tests/unit/**/*.test.{ts,tsx}', '<rootDir>/tests/unit/**/*.spec.{ts,tsx}'],
  collectCoverageFrom: ['src/components/Hero.tsx', 'src/components/CTAButtons.tsx'],
  coverageThreshold: {
    './src/components/Hero.tsx': {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/components/CTAButtons.tsx': {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
