'use client';

import { useAuthStore } from '@/stores/auth.store';

/**
 * Settings Page
 * URL: /dashboard/settings
 */

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={user?.name || ''}
                className="w-full px-3 py-2 border border-border rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              Update Profile
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-3 py-2 border border-border rounded-md hover:bg-muted">
              Change Password
            </button>
            <button className="w-full text-left px-3 py-2 border border-border rounded-md hover:bg-muted">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-3 py-2 border border-border rounded-md hover:bg-muted text-red-600">
              Delete Account
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Marketing Emails</span>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">API Access</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage API keys for integrations
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              Generate API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
