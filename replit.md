# Overview

This is a comprehensive Indian market analysis platform called "MarketPulse" that provides real-time market data, Pine Script management, chart analysis, and educational content for traders. The application features a modern React frontend with a dark theme and glass morphism design, backed by an Express.js server with PostgreSQL database integration via Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built using React with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety and development efficiency
- **Styling**: Tailwind CSS with custom design system using CSS variables for theming, featuring a dark mode design with glass morphism effects
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent, accessible UI elements
- **State Management**: TanStack Query (React Query) for server state management and caching, providing optimistic updates and background refetching
- **Routing**: Wouter for lightweight client-side routing
- **Real-time Updates**: Custom WebSocket hook for live market data streaming

## Backend Architecture

The server follows a RESTful API design with real-time capabilities:

- **Framework**: Express.js with TypeScript for robust server-side development
- **API Design**: RESTful endpoints following conventional HTTP methods and status codes
- **Real-time Communication**: WebSocket server for streaming live market data updates
- **File Handling**: Multer middleware for handling Pine Script file uploads with memory storage
- **Development Tools**: Vite integration for hot module replacement in development mode

## Data Storage Solutions

The application uses a PostgreSQL database with Drizzle ORM for type-safe database operations:

- **ORM**: Drizzle ORM with PostgreSQL dialect for compile-time type safety and excellent TypeScript integration
- **Database**: PostgreSQL as the primary database, configured through Neon Database serverless connection
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Data Models**: Four main entities - users, pine_scripts, market_data, and price_alerts with proper foreign key relationships
- **Fallback Storage**: In-memory storage implementation for development and testing purposes

## Authentication and Authorization

Currently implements a basic user system:

- **User Management**: Simple user table with username/password fields
- **Session Handling**: Uses connect-pg-simple for PostgreSQL-backed session storage
- **Default User**: Temporary "default-user" system for development, indicating future authentication integration planned

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **Connection Management**: Uses @neondatabase/serverless driver for optimized serverless connections

### UI and Styling
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives including dialogs, dropdowns, tooltips, and form controls
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens and dark mode support
- **CSS Variables**: Custom theming system with predefined color palettes for consistent branding

### Development and Build Tools
- **Vite**: Modern build tool providing fast development server with hot module replacement
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

### Data Fetching and Real-time Features
- **TanStack Query**: Powerful data synchronization library with caching, background updates, and optimistic updates
- **WebSocket (ws)**: Real-time bidirectional communication for live market data streaming
- **Date-fns**: Modern date utility library for market data timestamp handling

### Form Handling and Validation
- **React Hook Form**: Performant forms with minimal re-renders and easy validation
- **Zod**: TypeScript-first schema validation library integrated with Drizzle for runtime type safety
- **Hookform Resolvers**: Integration between React Hook Form and Zod for seamless form validation

### Market Data Features
- **Chart Integration**: Prepared for TradingView widget integration for professional-grade charting
- **Real-time Updates**: WebSocket-based live market data with automatic reconnection
- **Market Screeners**: Built-in filters for top gainers, losers, and high-volume stocks
- **Pine Script Management**: File upload, categorization, and code management system for trading strategies

The architecture emphasizes type safety, real-time capabilities, and modern development practices while maintaining scalability for future enhancements like advanced authentication, more market data sources, and expanded Pine Script functionality.