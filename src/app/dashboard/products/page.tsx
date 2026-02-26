'use client';

/**
 * Products Management Page
 * URL: /dashboard/products
 */

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and variants
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-muted text-muted-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted/80">
            Import
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
            Add Product
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-blue-600">�️</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Published
              </p>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            <div className="text-green-600">✅</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold text-orange-600">0</p>
            </div>
            <div className="text-orange-600">📝</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Categories
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-purple-600">🏷️</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Add your first product</h2>
          <p className="text-muted-foreground mb-6">
            Start building your store by adding products to your catalog.
          </p>
          <div className="flex justify-center space-x-3">
            <button className="bg-muted text-muted-foreground px-6 py-3 rounded-md font-medium hover:bg-muted/80">
              Import Products
            </button>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
