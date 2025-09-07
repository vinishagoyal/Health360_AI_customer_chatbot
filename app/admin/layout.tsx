import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto flex w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-dvh overflow-hidden">
          <div className="h-14 border-b px-4 flex items-center shrink-0">
            <h1 className="text-sm font-medium">Health360 Admin</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
