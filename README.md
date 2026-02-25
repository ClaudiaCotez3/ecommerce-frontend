# ECommerce Frontend - Professional SaaS Architecture

Multi-shop SaaS platform built with Next.js, TypeScript, and modern best practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router routes
├── modules/                # Feature modules (vertical slicing)
├── shared/                 # Reusable components & utilities
├── infrastructure/         # API clients & external services
├── stores/                 # Global state management
├── styles/                 # Global styles & design tokens
└── types/                  # Shared TypeScript definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Code Quality**: ESLint + Prettier
- **UI Components**: Ready for Shadcn/ui

## � Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Lint code
npm run lint:fix    # Fix linting issues
npm run format      # Format code with Prettier
```

## ✨ Features

- ✅ Professional architecture with vertical slicing
- ✅ Strict TypeScript configuration
- ✅ Path aliases (`@/*`) for clean imports
- ✅ Design system with CSS variables
- ✅ Dark mode support
- ✅ Responsive layouts
- ✅ Modern development workflow

## 🎯 Development Status

**Phase 1**: ✅ Base setup complete
**Phase 2**: ✅ Infrastructure & API communication ready
**Phase 3**: 🚧 Ready for feature modules

### Phase 2 Features Added

- ✅ Centralized Axios client with interceptors
- ✅ TanStack Query configuration
- ✅ Global error handling
- ✅ Loading components
- ✅ Refresh token architecture (prepared)
- ✅ Development tools integration

---

Built with professional standards for enterprise SaaS applications.
