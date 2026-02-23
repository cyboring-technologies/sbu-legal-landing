/**
 * Commitlint Configuration Template
 *
 * This configuration enforces conventional commit standards across the monorepo.
 * Based on @commitlint/config-conventional with custom rules for the SAAS platform.
 *
 * Commit Format: <type>(<scope>): <subject>
 * Example: feat(auth): add OAuth2 integration
 *
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */

module.exports = {
  // Extend the conventional commit configuration
  extends: ['@commitlint/config-conventional'],

  // Custom rules for the SAAS monorepo
  rules: {
    // Type enum: Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style changes (formatting, no logic change)
        'refactor', // Code refactoring
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'build', // Build system or external dependencies
        'ci', // CI/CD configuration changes
        'chore', // Other changes (maintenance)
        'revert', // Revert previous commit
        'security', // Security fixes or improvements
        'deps', // Dependency updates
      ],
    ],

    // Scope enum: Allowed scopes (optional but recommended)
    'scope-enum': [
      1,
      'always',
      [
        // Core Backend
        'core',
        'functions',
        'microservices',
        'shared',
        'sbu',

        // Frontend
        'frontend',
        'corporate-web',
        'investor-portal',
        'app',

        // Infrastructure
        'infra',
        'k8s',
        'docker',
        'bicep',

        // AI/LLM
        'agents',
        'llm',
        'n8n',
        'ollama',

        // Services
        'auth',
        'api',
        'db',
        'validator',
        'parser',
        'converter',
        'notificator',

        // DevOps
        'ci',
        'scripts',
        'config',

        // Documentation
        'docs',
        'readme',
      ],
    ],

    // Subject case: Use lower case for subject
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    // Subject empty: Subject is required
    'subject-empty': [2, 'never'],

    // Subject full stop: No period at the end of subject
    'subject-full-stop': [2, 'never', '.'],

    // Type case: Type must be lower case
    'type-case': [2, 'always', 'lower-case'],

    // Type empty: Type is required
    'type-empty': [2, 'never'],

    // Scope case: Scope must be lower case
    'scope-case': [2, 'always', 'lower-case'],

    // Header max length: Max 100 characters for the header
    'header-max-length': [2, 'always', 100],

    // Body leading blank: Body must have a blank line before it
    'body-leading-blank': [1, 'always'],

    // Footer leading blank: Footer must have a blank line before it
    'footer-leading-blank': [1, 'always'],

    // Body max line length: Soft limit for body lines
    'body-max-line-length': [1, 'always', 200],
  },

  // Parser preset options
  parserPreset: {
    parserOpts: {
      // Support for issue references
      issuePrefixes: ['#', 'JIRA-', 'TICKET-'],
    },
  },

  // Ignore patterns for commits
  ignores: [
    // Ignore merge commits
    (commit) => commit.includes('Merge branch'),
    (commit) => commit.includes('Merge pull request'),

    // Ignore WIP commits in feature branches
    (commit) => commit.startsWith('WIP:'),
  ],

  // Default ignore rules
  defaultIgnores: true,

  // Help URL for commit format
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
