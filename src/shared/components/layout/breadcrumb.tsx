'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Dynamic Breadcrumb Component
 *
 * Features:
 * - Automatic path-based breadcrumb generation
 * - Clean SaaS design
 * - Click navigation
 * - Path transformation
 */

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive: boolean;
}

export function Breadcrumb() {
  const pathname = usePathname();

  // Transform path to breadcrumb items
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    if (!pathname || pathname === '/') {
      return [{ label: 'Dashboard', href: '/dashboard', isActive: true }];
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Always start with Dashboard
    items.push({
      label: 'Dashboard',
      href: '/dashboard',
      isActive: false,
    });

    // Build breadcrumb from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isActive = index === pathSegments.length - 1;

      // Skip the first 'dashboard' segment as it's already added
      if (segment === 'dashboard') return;

      // Transform segment names to readable labels
      const label = transformSegmentToLabel(segment);

      items.push({
        label,
        href: currentPath,
        isActive,
      });
    });

    return items;
  };

  // Transform URL segments to readable labels
  const transformSegmentToLabel = (segment: string): string => {
    const transformations: Record<string, string> = {
      products: 'Products',
      categories: 'Categories',
      inventory: 'Inventory',
      orders: 'Orders',
      settings: 'Settings',
      team: 'Team',
      analytics: 'Analytics',
      customers: 'Customers',
      reports: 'Reports',
    };

    return (
      transformations[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumb for dashboard home
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <svg
              className="h-4 w-4 mx-2 text-muted-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {item.isActive ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link
              href={item.href as any}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
