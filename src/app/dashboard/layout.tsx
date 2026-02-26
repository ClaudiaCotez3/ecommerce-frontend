'use client';

import { useState } from 'react';
import { AuthGuard } from '@/shared/guards';
import { Sidebar, Navbar, Breadcrumb } from '@/shared/components/layout';

/**
 * Professional SaaS Dashboard Layout
 *
 * Features:
 * - Fixed sidebar with navigation
 * - Sticky top navbar
 * - Dynamic breadcrumb
 * - Responsive design
 * - Protected by AuthGuard
 */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Main Layout */}
        <div
          className={`
            transition-all duration-300
            ${isCollapsed ? 'ml-16' : 'ml-64'}
          `}
        >
          {/* Top Navbar */}
          <Navbar
            isCollapsed={isCollapsed}
            onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
          />

          {/* Content Area */}
          <main className="pt-16">
            {' '}
            {/* pt-16 to account for fixed navbar */}
            {/* Breadcrumb */}
            <div className="border-b border-border bg-card">
              <div className="px-6 py-4">
                <Breadcrumb />
              </div>
            </div>
            {/* Page Content */}
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
