import SidebarWrapper from "@/components/SidebarWrapper";
import './globals.css';

export const metadata = {
  title: "Docs",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 dark:text-gray-100 antialiased">
        <div className="flex min-h-screen relative">

      
          <SidebarWrapper />

          <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 -z-10 flex justify-center pointer-events-none">
              <div className="absolute w-[800px] h-[800px] bg-blue-400/30 dark:bg-indigo-600/30 rounded-full filter blur-3xl -translate-x-64 top-1/2 -translate-y-1/2"></div>
              <div className="absolute w-[800px] h-[800px] bg-purple-300/30 dark:bg-purple-500/30 rounded-full filter blur-3xl translate-x-64 top-1/2 -translate-y-1/2"></div>
            </div>

 
            <div className="flex-1 ml-64 lg:ml-72 flex flex-col overflow-auto">
              <div className="prose prose-lg sm:prose-xl lg:prose-xl dark:prose-invert flex-1">
                {children}
              </div>
            </div>

          </div>

        </div>
      </body>
    </html>
  );
}
