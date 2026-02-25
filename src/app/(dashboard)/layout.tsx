export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation will be added in Phase 2 */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-muted-foreground">
            Dashboard Layout - Ready for Phase 2
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
