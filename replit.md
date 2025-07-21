# Airport Navigation Web App

## Overview

This is an intelligent airport navigation web application that provides personalized user experiences based on traveler personas. The app helps passengers navigate airport facilities through customized journey mapping and role-based interfaces.

## Recent Changes

**July 21, 2025:**
- **Updated journey step images with new high-quality assets**: Replaced all JOURNEY_IMAGES constants with new airport photos - Modern Airport Terminal for terminal/arrival areas, Airport Boarding Area for boarding/waiting areas, Airport Service Counter for service interactions, Airport Kiosk Interaction for check-in processes, and Airport Security Scene for security/screening areas
- **Fixed image visibility issue**: Converted image paths from direct URL references to proper import statements using @assets/ syntax to ensure images are visible and properly bundled by Vite
- **Maintained carousel card dimensions**: Fixed height of 320px for all carousel cards as per original specifications
- **Fixed journey detail page spacing**: Restored proper vertical spacing between elements across all breakpoints to prevent overlapping
- **Standardized H1 text sizing**: Unified H1 font size across all pages (1.75rem base) with consistent persona scaling for viewport optimization
- **Consistent border radius**: Standardized all border radius values to `rounded-lg` (0.5rem/8px) across carousel cards, navigation buttons, input fields, and UI components for visual consistency
- **Mobile viewport optimization**: Increased top/bottom margins for mobile devices (100px top, 60px bottom) while maintaining centered content layout for better visual balance
- **Fixed carousel card radius consistency**: Updated carousel card content container from `rounded-2xl` to `rounded-lg` to match site-wide border radius standard
- **Code cleanup and consistency**: Removed borders from carousel icon containers, cleaned up unnecessary comments, standardized image border radius, and optimized CSS classes
- **Enhanced dock navigation**: Added hover labels to dock icons showing clear journey detail titles with persona-specific typography
- **Centered image positioning**: Anchored journey point selection image to the center of the viewport for better visual balance
- **Increased carousel spacing**: Enhanced spacing between carousel elements to 32px desktop, 24px tablet, 16px mobile for better visual separation
- **Updated all journey step images**: Replaced images with high-quality local airport photos that precisely match each journey point - service counters, boarding areas, terminal arrivals, kiosk interactions, and security scenes for better contextual accuracy
- **Personalized page titles**: Changed journey selection header from generic "Seleziona il punto del journey" to display the specific persona title (e.g., "Family Planner", "Tech-Savvy", "Senior PRM")
- **Updated boarding images**: Replaced all boarding area images with higher quality updated boarding gate photo showing numbered gate areas and seating
- **Created image constants**: Organized all journey step images into centralized JOURNEY_IMAGES constants mapped to specific dock button labels for better maintainability
- **Updated Post-volo image**: Associated the arrivals terminal image showing "Arrival" signage with the "Post-volo" journey step for better contextual accuracy
- **Modified zoom animation**: Reduced animation speed to 900ms and limited maximum scale to 3x to ensure image fits within viewport
- **Updated ARRIVAL image constant**: Set ARRIVAL constant to use the correct arrivals terminal image path
- Disabled interactions for inactive carousel cards (only center card is clickable and hoverable)
- Updated persona selection page to use neutral styling (gray colors) except for the persona preview card
- Enhanced journey pages (welcome and detail) to use full persona-specific theming including colors, typography, and gradients
- Applied persona-specific styling to buttons and navigation elements throughout journey flow
- Implemented advanced persona logic with complete typography customization:
  * Tech-Savvy: Manrope/Lora fonts, Midnight Navy/Electric Blue/Vivid Gold colors
  * Family Planner: Roboto/Roboto Serif fonts, Charcoal/Fresh Lime/Sunset Orange colors
  * Senior PRM: Titillium Web font with 125% text scaling for accessibility, Deep Teal/Soft Ivory/Royal Violet colors
  * Bleisure Nomad: Work Sans/Playfair Display fonts, Jet Black/Sky Cyan/Sunshine colors
  * First-Time Student: Montserrat/Nunito fonts, Oxford Blue/Lantern Yellow/Arctic White colors
- Synchronized user name display throughout journey (uses input name from login instead of hardcoded persona names)
- **Completed full persona synchronization** across all interactive elements:
  * MacOSDock component now uses persona accent colors for dock icons
  * Carousel3D component synchronized with persona colors for action buttons, navigation arrows, and pagination indicators
  * PromptInputBox component applies persona colors to send button and typography to input field
  * Fixed console errors "Dock is not defined" and undefined fontFamily properties
  * All interactive states (hover, active, disabled) now reflect persona-specific color schemes
- **Enhanced WCAG 2.1 AA/AAA accessibility compliance:**
  * Created comprehensive accessibility utilities library with contrast ratio validation
  * Implemented automatic accessibility validation for all personas with console warnings
  * Updated all persona colors to meet WCAG AA contrast requirements (4.5:1 minimum)
  * Enhanced typography with proper line-height (1.5+), letter-spacing, and minimum font sizes
  * Added focus ring management and screen reader support (aria-labels)
  * Senior persona optimized with 125% font scaling and enhanced contrast for reduced vision
  * Family persona updated with accessible green colors instead of bright lime
  * All personas now include fallback system fonts for better compatibility
  * CSS custom properties applied for consistent theming across all components
- **Complete card theming with accessibility compliance:**
  * Enhanced Card component with persona-specific backgrounds, borders, and text colors
  * Active cards use primary colors for backgrounds and borders with white text for optimal contrast
  * Inactive cards maintain neutral styling to focus attention on active elements
  * All card interactions respect WCAG AA color contrast requirements (4.5:1 minimum)
  * Carousel3D component fully synchronized with persona colors for headers, icons, and content
  * Added proper border styling and hover states with persona accent colors

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