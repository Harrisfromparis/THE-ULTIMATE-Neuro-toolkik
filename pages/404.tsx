export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-6">
      <div className="bg-white border border-border rounded-lg shadow p-8 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">404 - Page Not Found</h1>
        <p className="text-textSecondary mb-6">The page you are looking for doesn’t exist.</p>
        <a href="/" className="bg-primary hover:bg-accent text-textPrimary font-medium py-2 px-4 rounded-md border border-border">
          Home
        </a>
      </div>
    </div>
  );
}
