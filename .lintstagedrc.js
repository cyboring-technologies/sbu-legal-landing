module.exports = {
  // Frontend Apps (Next.js)
  'frontend/frontend-app/**/*.{ts,tsx,js,jsx}': ['cd frontend/frontend-app && npm run lint --fix'],
  'frontend/corporate-web/**/*.{ts,tsx,js,jsx}': [
    'cd frontend/corporate-web && npm run lint --fix',
  ],
  'frontend/investor-portal/**/*.{ts,tsx,js,jsx}': [
    'cd frontend/investor-portal && npm run lint --fix',
  ],

  // Core Backend
  'core-backend/shared/**/*.ts': ['cd core-backend/shared && npm run lint --fix'],
  'core-backend/microservices/services/validator/**/*.ts': [
    'cd core-backend/microservices/services/validator && npm run lint --fix',
  ],
};
