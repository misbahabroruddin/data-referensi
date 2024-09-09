"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarExpand } = useSidebar();

  return (
    <>
      <Navbar />
      <Sidebar />
      <main
        className={cn(
          "min-h-dvh bg-[#F8F7F7] px-6 py-4 transition-all duration-300",
          isSidebarExpand ? "ml-64" : "ml-[72px]",
        )}
      >
        <div className="mb-20 mt-16">{children}</div>
      </main>
      <footer className="fixed bottom-0 grid h-[62px] w-full place-items-center bg-[#F8F7F7] text-sm text-[#666666]">
        <p>&#169; Copyright BPPTI Universitas Siber Asia</p>
      </footer>
    </>
  );
}
