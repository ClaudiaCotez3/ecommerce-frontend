'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

/**
 * Professional Sidebar Component for SaaS Dashboard
 *
 * Features:
 * - Active route detection
 * - Professional SaaS design
 * - Responsive layout
 * - Role-based menu items (prepared)
 */

interface MenuItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  roles?: string[]; // For future role-based access
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    label: 'Products',
    href: '/dashboard/products',
    icon: '📦',
  },
  {
    label: 'Categories',
    href: '/dashboard/categories',
    icon: '🏷️',
  },
  {
    label: 'Inventory',
    href: '/dashboard/inventory',
    icon: '📋',
  },
  {
    label: 'Orders',
    href: '/dashboard/orders',
    icon: '🛒',
  },
  {
    label: 'Team',
    href: '/dashboard/team',
    icon: '👥',
    badge: 'Soon',
    roles: ['admin'], // Example of role restriction
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(href) || false;
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen bg-card border-r border-border
        transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo/Brand Area */}
      <div className="flex h-16 items-center border-b border-border px-4">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
              E
            </div>
            <span className="font-semibold text-foreground">
              ECommerce SaaS
            </span>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
            E
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isItemActive = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href as any}
              className={`
                group flex items-center rounded-lg px-3 py-2 text-sm font-medium
                transition-colors duration-200
                ${
                  isItemActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="ml-3">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground">
            <p>SaaS Platform v1.0</p>
            <p className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Online
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        )}
      </div>
    </aside>
  );
}
