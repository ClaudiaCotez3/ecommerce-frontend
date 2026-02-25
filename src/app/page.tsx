export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          ECommerce SaaS Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional frontend architecture ready for multi-shop SaaS
          development with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <div className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow">
          ✅ Base Setup Complete
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Architecture</h3>
          <p className="text-sm text-muted-foreground">
            Vertical slicing with modules, shared components, and clean
            separation.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">TypeScript</h3>
          <p className="text-sm text-muted-foreground">
            Strict typing with professional configuration and path aliases.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Styling</h3>
          <p className="text-sm text-muted-foreground">
            Tailwind CSS with design system tokens and dark mode support.
          </p>
        </div>
      </div>
    </div>
  );
}
