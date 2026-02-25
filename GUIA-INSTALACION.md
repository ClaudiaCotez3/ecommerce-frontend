# Installation Guide

## Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Update utils after install** (if needed)
   Replace `src/shared/lib/utils.ts` content with:

   ```typescript
   import { type ClassValue, clsx } from 'clsx';
   import { twMerge } from 'tailwind-merge';

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   http://localhost:3000

## Troubleshooting

If you encounter TypeScript errors after installation, run:

```bash
npm run lint:fix
```

Project is ready for Phase 2 development.
