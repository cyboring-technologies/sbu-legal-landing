# SBU Legal Landing - Corporate Website

Static marketing website for SAAS, built with Next.js, TypeScript and Tailwind CSS.

## 🚀 Tech Stack

-   **Framework:** [Next.js 14](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
-   **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Testing:** [Jest](https://jestjs.io/) & [Playwright](https://playwright.dev/)

## 🛠️ Getting Started

### Prerequisites

-   Node.js (LTS recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd sbu-legal-landing
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## 💻 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000`. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint to check for code quality issues. |
| `npm run format` | Formats code using Prettier. |
| `npm run test` | Runs both unit and E2E tests. |
| `npm run test:unit` | Runs unit tests with Jest. |
| `npm run test:e2e` | Runs end-to-end tests with Playwright. |

## 📁 Project Structure

```text
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   ├── i18n/          # Internationalization configuration
│   └── styles/        # Global styles
├── public/            # Static assets
├── tests/             # Test files
└── ...config files    # Configuration files (Tailwind, TypeScript, etc.)
```

## 🧪 Testing

### Unit Tests
Run unit tests using Jest:
```bash
npm run test:unit
```

### E2E Tests
Run end-to-end tests using Playwright:
```bash
npm run test:e2e
```
