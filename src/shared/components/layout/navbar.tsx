'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/shared/components/ui/button';
import { ShopSelector } from '@/modules/shops/components/shop-selector';

/**
 * Professional Navbar Component for SaaS Dashboard
 *
 * Features:
 * - User profile dropdown
 * - Shop selector (prepared)
 * - Sidebar toggle
 * - Clean SaaS design
 */

interface NavbarProps {
  onToggleSidebar?: () => void;
  isCollapsed?: boolean;
}

export function Navbar({ onToggleSidebar, isCollapsed = false }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header
      className={`
        fixed top-0 z-30 w-full bg-card border-b border-border
        transition-all duration-300
        ${isCollapsed ? 'left-0' : 'left-64'}
      `}
      style={{ width: isCollapsed ? '100%' : 'calc(100% - 16rem)' }}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Toggle and Breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="h-8 w-8 p-0"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>

          {/* Shop Selector - Real */}
          <ShopSelector className="hidden md:flex" />
        </div>

        {/* Right side - User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications (Placeholder) */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="text-lg">🔔</span>
          </Button>

          {/* User Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 h-8 px-2"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* User Avatar */}
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              {/* User Name */}
              <span className="hidden md:block text-sm">
                {user?.name || user?.email || 'User'}
              </span>
              {/* Dropdown Arrow */}
              <svg
                className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                {/* Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-20">
                  <div className="p-2">
                    {/* User Info */}
                    <div className="px-2 py-2 border-b border-border">
                      <p className="text-sm font-medium">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="mt-2 space-y-1">
                      <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded">
                        👤 Profile
                      </button>
                      <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded">
                        ⚙️ Settings
                      </button>
                      <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded">
                        💳 Billing
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded text-red-600"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
