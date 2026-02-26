'use client';

/**
 * Analytics Page
 * URL: /dashboard/analytics
 */

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your store performance and insights
          </p>
        </div>
        <div className="flex space-x-2">
          <select className="border border-border rounded-md px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-xs text-green-600">+0% from last period</p>
            </div>
            <div className="text-green-600">💰</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Orders
              </p>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-green-600">+0% from last period</p>
            </div>
            <div className="text-blue-600">📦</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customers
              </p>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-green-600">+0% from last period</p>
            </div>
            <div className="text-purple-600">👥</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Order Value
              </p>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-xs text-green-600">+0% from last period</p>
            </div>
            <div className="text-orange-600">💳</div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-muted-foreground">Chart will appear here</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-muted-foreground">
                Product rankings will appear here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Activity</h3>
        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
          <div className="text-center">
            <div className="text-4xl mb-2">👤</div>
            <p className="text-muted-foreground">
              Customer analytics will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
