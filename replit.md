# Airport Navigation Web App

## Overview

This is an intelligent airport navigation web application that provides personalized user experiences based on traveler personas. The app helps passengers navigate airport facilities through customized journey mapping and role-based interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side navigation
- **UI Library**: Radix UI primitives with custom styled components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for transitions and interactive elements
- **State Management**: React Context API with custom hooks
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints
- **Development Server**: Vite for hot module replacement and development tooling
- **Session Management**: Express sessions with PostgreSQL storage

### Component Structure
- **Design System**: shadcn/ui components with "new-york" style
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Interactive Components**: Custom dock navigation, expandable media components
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Persona System
- **Five distinct personas**: Tech-Savvy, Family Planner, Senior PRM, Bleisure Nomad, First-Time Student
- **Dynamic theming**: Each persona has custom colors, fonts, and UI adaptations
- **Journey mapping**: Persona-specific navigation steps and touchpoints
- **Behavioral profiling**: Customized experiences based on traveler type

### Navigation Flow
1. **Login/Selection**: Persona selection with preview cards
2. **Welcome Screen**: Personalized greeting with journey overview
3. **Interactive Dock**: Bottom-anchored navigation with hover effects
4. **Journey Details**: Step-specific actions and information
5. **Responsive Design**: Adaptive layouts for desktop and mobile

### UI Components
- **Dock Navigation**: Magnifying dock with smooth animations
- **Scroll Expand Media**: Full-screen media transitions
- **Themed Cards**: Persona-specific styling and layouts
- **Interactive Buttons**: Material Design influence with custom animations

## Data Flow

### Client-Side State
- **Persona Context**: Global state for selected persona and current journey step
- **Theme Management**: Dynamic CSS variable updates based on persona
- **Navigation State**: Current page and journey progress tracking

### Server-Side Data
- **Static Personas**: Predefined persona configurations with journey steps
- **Journey Steps**: Step-specific actions, icons, and images
- **API Endpoints**: RESTful routes for persona and journey data

### Data Schema
- **Users**: Basic authentication (username/password)
- **Personas**: Core persona data (name, title, description, theme)
- **Journey Steps**: Navigation points with ordering and metadata
- **Actions**: Step-specific available actions and descriptions

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18 with hooks, React Router alternative (Wouter)
- **UI Framework**: Radix UI primitives for accessibility
- **Animation**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tool**: Vite for fast development and optimized builds
- **TypeScript**: Full type safety across frontend and backend
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod for runtime type checking

### Database Integration
- **PostgreSQL**: Primary database with Neon serverless hosting
- **Drizzle Kit**: Database migrations and schema management
- **Connection**: Neon serverless driver for edge compatibility

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles Express server to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Development**: Local development with Vite dev server and hot reload
- **Production**: Express serves static files and API routes
- **Database**: Environment variable configuration for PostgreSQL connection

### Platform Integration
- **Replit**: Native support with cartographer plugin for development
- **Error Handling**: Runtime error overlay for development debugging
- **Session Storage**: PostgreSQL-backed sessions for user state persistence

### Scaling Considerations
- **Database**: Serverless PostgreSQL for automatic scaling
- **Static Assets**: CDN-ready build output structure
- **API Design**: RESTful endpoints designed for caching and optimization