import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AdminSidebar } from "@/admin/layout/AdminSidebar";
import { AdminTopbar } from "@/admin/layout/AdminTopbar";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-bone xl:grid xl:grid-cols-[18rem_1fr]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="relative min-w-0">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(183,145,96,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(141,31,50,0.16),transparent_28%)]" />
        <AdminTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 md:px-6 xl:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
