'use client';

/**
 * Team Management Page
 * URL: /dashboard/team
 */

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their permissions
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-muted text-muted-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted/80">
            Export
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
            Invite Member
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Members
              </p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="text-blue-600">👥</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admin</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <div className="text-red-600">👑</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Manager
              </p>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
            <div className="text-orange-600">👔</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Staff</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-green-600">👤</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-xl font-semibold mb-2">
            Invite your first team member
          </h2>
          <p className="text-muted-foreground mb-6">
            Start collaborating with your team by sending an invitation.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90">
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
