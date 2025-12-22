# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 e-commerce application with internationalization support, built with the App Router.

### Key Technologies
- **Next.js 16** with App Router and Turbopack
- **next-intl** for internationalization (locales: `eng`, `fr`)
- **MUI (Material UI) v7** for component library
- **Tailwind CSS v4** for styling
- **TypeScript** with strict mode

### Project Structure

```
src/
├── api/           # API client and data fetching functions
├── app/
│   ├── [locale]/  # Locale-specific routes (main app content)
│   └── layout.tsx # Root layout
├── components/
│   ├── cart/      # Shopping cart components
│   ├── common/    # Shared UI components
│   ├── icons/     # Custom icon components
│   ├── layout/    # Header, Footer, AppLayout
│   ├── news/      # News-related components
│   └── products/  # Product display components
├── context/       # React contexts (cart, collection-submenu)
├── i18n/          # Internationalization config (routing.ts, navigation.ts, request.ts)
├── types/         # TypeScript type definitions
└── utils/         # Utility functions and constants
messages/          # Translation JSON files (en.json, fr.json)
```

### Routing & Internationalization

- All pages live under `src/app/[locale]/` for locale-prefixed URLs
- Locales defined in `src/types/routing.ts`: `eng` (default), `fr`
- Middleware (`src/middleware.ts`) handles locale detection and routing
- Translation messages stored in `messages/` directory
- Use `next-intl` hooks for translations in components

### API Layer

- Custom API client at `src/api/api-client.ts` using native fetch
- Requires `API_BASE_URL` and `API_KEY` environment variables
- Data fetching functions in `src/api/`: products.ts, news.ts, images.ts, translations.ts
- Default 5-minute revalidation for GET requests

### State Management

- Cart state managed via React Context (`src/context/cart/`)
- Collection submenu state via React Context (`src/context/collection-submenu/`)

### Path Alias

Use `@/*` to import from `src/*` (configured in tsconfig.json).
