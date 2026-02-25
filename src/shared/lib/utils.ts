// Utility function for combining CSS classes
// Will be updated with clsx and tailwind-merge after npm install

export function cn(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(' ').trim();
}

// TODO: Replace with proper clsx and tailwind-merge implementation:
// import { type ClassValue, clsx } from 'clsx'
// import { twMerge } from 'tailwind-merge'
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
