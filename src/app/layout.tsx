import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import { metadataConfig } from "@/config/metadata";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/providers/query-provider";
import { SessionProvider } from "@/lib/providers/session-provider";
import { SidebarProvider } from "@/lib/providers/sidebar-provider";
import { Spinner } from "@/components/ui/spinner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...metadataConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <SessionProvider>
          <QueryProvider>
            <SidebarProvider>
              <Suspense
                fallback={
                  <div className="grid h-screen w-screen place-items-center">
                    <Spinner />
                  </div>
                }
              >
                {children}
              </Suspense>
            </SidebarProvider>
          </QueryProvider>
        </SessionProvider>
        <Toaster position="top-center" richColors theme="light" />
      </body>
    </html>
  );
}
