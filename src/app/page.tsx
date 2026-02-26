'use client';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          🎉 ECommerce SaaS Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome! Your authentication system is working perfectly.
        </p>
        <div className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow">
          ✅ Phase 3 Authentication Complete
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ Login System</h3>
          <p className="text-sm text-muted-foreground">
            Users can register and login successfully.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ Protected Routes</h3>
          <p className="text-sm text-muted-foreground">
            Dashboard and private routes are properly protected.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ JWT Tokens</h3>
          <p className="text-sm text-muted-foreground">
            Automatic token management and API authentication.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
}
