'use client';

/**
 * Categories Management Page
 * URL: /dashboard/categories
 */

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products with categories and subcategories
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
          Add Category
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏷️</div>
          <h2 className="text-xl font-semibold mb-2">No categories yet</h2>
          <p className="text-muted-foreground mb-6">
            Create categories to organize your product catalog effectively.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90">
            Create Your First Category
          </button>
        </div>
      </div>
    </div>
  );
}
