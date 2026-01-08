# WOS Packaging Website

## Overview

This is a B2B product showcase website for WOS Packaging, a South African supplier based in the Western Cape. The site displays industrial packaging materials, safety equipment, and work/promotional clothing. This is NOT an e-commerce store - products are showcased for quote requests only, not direct checkout.

The application uses a React frontend with Express backend, PostgreSQL database, and follows a modern full-stack TypeScript architecture with shared schemas and API definitions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **State Management**: TanStack Query (React Query) for server state and caching
- **Animations**: Framer Motion for scroll reveals and transitions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js running on Node.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response handling
- **Database ORM**: Drizzle ORM for PostgreSQL with type-safe queries
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    components/ui # shadcn/ui components
    pages/        # Route-level page components
    hooks/        # Custom React hooks for data fetching
    lib/          # Utilities and query client setup
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared code between client and server
  schema.ts       # Drizzle database schema definitions
  routes.ts       # API route contracts with Zod validation
```

### Data Flow
1. Database schema defined in `shared/schema.ts` using Drizzle
2. API contracts defined in `shared/routes.ts` with Zod for validation
3. Server implements routes in `server/routes.ts` using storage layer
4. Client uses custom hooks in `client/src/hooks/` that call API endpoints
5. React Query handles caching, loading states, and mutations

### Key Design Decisions
- **Shared Types**: Schema and route definitions are shared between frontend and backend, ensuring type safety across the stack
- **Quote-Based System**: No shopping cart or checkout - users submit quote requests for products
- **Industrial Aesthetic**: UI designed to feel industrial, minimal, and B2B-focused with custom button variants

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle Kit**: Used for database migrations (`npm run db:push`)

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe PostgreSQL ORM
- **zod**: Runtime type validation for API requests/responses
- **framer-motion**: Animation library for UI transitions

### UI Framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives (used by shadcn)

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling for production
- **tsx**: TypeScript execution for development