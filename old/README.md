# Portfolio - Pedro Henrique

This is a personal portfolio project built using **React**, **TypeScript**, and **Vite**. It showcases my skills, projects, and contact information in a visually appealing and responsive design.

## Features

- **React + TypeScript**: Modern development stack for building scalable and maintainable applications.
- **Vite**: Fast development environment with optimized builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Dark Mode**: Theme toggle between light and dark modes.
- **Interactive Components**: Custom components like tooltips, modals, and drawers using Radix UI.
- **Project Showcase**: Detailed project cards with descriptions, technologies used, and links to repositories or live demos.

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Tailwind Merge, Tailwind Animate
- **UI Components**: Radix UI (Dialog, Tooltip, Popover, Switch, Drawer)
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tools**: Vite, SWC
- **Linting**: ESLint with TypeScript and React-specific rules

## Project Structure

The project is organized as follows:

```
portfolio/
├── .github/            # GitHub Actions workflows (actually for auto deployment at Hostinger)
├── public/             # Public assets
├── src/
│   ├── assets/         # Static assets (svg icons, fonts and project images)
│   ├── components/     # Reusable React components
│   ├── constants/      # Constants used across the app
│   ├── hooks/          # Some custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Entry point
├── package.json        # Project dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/PedroHenriqueNS/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Build for Production

To create a production build, run:

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

The build has three steps:

1. `vite build` bundles the client.
2. `vite build --ssr src/entry-server.tsx` bundles a server renderer (build-time only, never shipped).
3. `scripts/prerender.mjs` renders every page to static HTML, so search engines and AI crawlers (which usually don't run JavaScript) read the whole site:
   - `dist/index.html` (home) and `dist/projeto-<slug>.html` (one page per project, served at `/projetos/<slug>` by `public/.htaccess`);
   - each page's own `<title>`, description, canonical, Open Graph/Twitter tags and JSON-LD;
   - `dist/sitemap.xml` and `dist/llms.txt`.

Project data (title, summary, description, stack, links) lives in `src/constants/projects.tsx`: the grid, the project pages, the JSON-LD, the sitemap and `llms.txt` all come from it. Adding a project is one entry there plus a 1200x630 image in `public/og/<slug>.jpg`.

## Contact

- **Email**: pedrohe.contato@gmail.com
- **GitHub**: [@PedroHenriqueNS](https://github.com/PedroHenriqueNS)
- **LinkedIn**: [Pedro Henrique](https://www.linkedin.com/in/PedroHenriqueNS/)