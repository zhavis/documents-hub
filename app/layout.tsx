// app/docs/layout.tsx (or pages/docs/_layout.tsx)
import './globals.css';

export const metadata = {
  title: "Docs",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 dark:text-gray-100 antialiased">
        <div className="flex min-h-screen relative mx-auto">
          {/* Main Content */}
          <div className="flex flex-col overflow-auto px-6 lg:px-12 py-8 mx-auto">
            <div className="prose prose-lg sm:prose-xl lg:prose-xl dark:prose-invert flex-1">
              {children}
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}
