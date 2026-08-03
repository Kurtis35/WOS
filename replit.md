# WOS Packaging Website

## Overview
Static frontend-only React + Vite website for WOS Packaging (Pakmateriaal/Packaging). Features a homepage, about, products, and contact pages built with React, TypeScript, Tailwind CSS, and Radix UI components.

## Stack
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Radix UI, shadcn/ui components
- **Routing:** Wouter
- **Animations:** Framer Motion

## Running the app
```
npm run dev
```
Runs on port 5000. No backend or database required — this is a pure frontend app.

## Build for production
```
npm run build
```
Outputs to `dist/`. Originally configured for Netlify (`netlify.toml`).

## Project structure
- `client/src/` — all React source code
- `shared/schema.ts` — shared TypeScript schemas
- `attached_assets/` — images and other static assets
