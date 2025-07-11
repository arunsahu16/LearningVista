# Domestika Creative Assistant

## Overview

This repository contains a Domestika Creative Assistant application - an AI-powered companion designed to help creative learners practice better, learn faster, and share more confidently. The application demonstrates core user flows including personalized learning journeys, AI co-creation tools, and community engagement features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Uploads**: Multer middleware for handling multipart form data
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── attached_assets/ # Project requirements and documentation
```

## Key Components

### Core Features
1. **AI Assistant Chat**: Real-time conversation interface with AI mentor
2. **Learning Journey**: Personalized skill progression tracking with progress bars
3. **AI Co-Creation Studio**: Project workspace with AI-powered creative tools
4. **Community Highlights**: Social features showcasing top creators and community updates
5. **Trending Topics**: Real-time trending content across creative platforms
6. **Project Management**: Upload, organize, and share creative projects

### Database Schema
- **Users**: Profile information, specialties, badges, and follower counts
- **Projects**: Creative work with categories, likes, and comments
- **Learning Progress**: Skill tracking with percentage completion
- **Chat Messages**: AI and user conversation history
- **Activities**: User action logging for engagement tracking
- **Trending Topics**: Platform-specific trending content
- **Community Updates**: Social feed and announcements

### UI Components
- Comprehensive design system using Shadcn/ui
- Responsive layouts with mobile-first approach
- Accessible components with proper ARIA attributes
- Consistent theming with CSS custom properties
- Smooth animations and transitions

## Data Flow

### Client-Server Communication
1. **API Requests**: RESTful endpoints using fetch with credentials
2. **Query Management**: TanStack Query handles caching, background updates, and error states
3. **Real-time Updates**: Server-sent events for live chat and activity feeds
4. **File Uploads**: Multipart form data for project assets

### State Management
1. **Server State**: TanStack Query manages API data with automatic caching
2. **Client State**: React hooks for component-level state
3. **Form State**: React Hook Form with Zod validation
4. **Toast Notifications**: Custom hook for user feedback

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database queries
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **react-hook-form**: Form management with validation
- **zod**: Runtime type validation
- **multer**: File upload handling

### UI Dependencies
- **@radix-ui/***: Accessible primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and IntelliSense
- **drizzle-kit**: Database migration management
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Database**: Local PostgreSQL or Neon development instance
- **File Storage**: Local filesystem for uploads

### Production Build
1. **Frontend**: Vite builds optimized React bundle
2. **Backend**: esbuild creates single-file Express server
3. **Database**: Drizzle migrations ensure schema consistency
4. **Assets**: Static files served from dist/public directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment flag for development/production
- **REPL_ID**: Replit-specific deployment identifier

### Hosting Considerations
- Serverless-ready Express application
- PostgreSQL-compatible database required
- File upload storage needs consideration for production
- Session storage backed by database for scalability

### Monitoring and Operations
- Request logging middleware for API endpoints
- Error handling with proper HTTP status codes
- Performance monitoring through query caching
- User activity tracking for engagement metrics

## Recent Changes - July 11, 2025
### Platform Enhancement - Full Interactive Functionality
- **Learning Path System**: Added comprehensive roadmap view with course catalog
- **AI-Powered Features**: Connected OpenAI API for real project analysis and feedback
- **Navigation System**: Made all buttons functional with smooth scrolling behavior
- **Community Features**: Added project images and clickable like buttons with state management
- **Notification System**: Implemented interactive notifications with AI feedback alerts
- **Responsive Design**: Enhanced mobile compatibility with touch-friendly interactions
- **Upload Experience**: Added AI analysis trigger with toast notifications
- **User Experience**: Added accessibility improvements and reduced motion support