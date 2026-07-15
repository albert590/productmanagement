"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminStats from "@/components/AdminStats";

function NavLink({ href, collapsed, label, children }: { href: string; collapsed: boolean; label: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 ${collapsed ? 'justify-center' : ''}`}>
      <span className="flex items-center">{children}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lancola_admin_collapsed");
      if (stored) setCollapsed(stored === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lancola_admin_collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className={`${collapsed ? "w-20" : "w-64"} bg-white border-r shadow-sm flex flex-col transition-all`}> 
        <div className="px-6 py-5 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">LC</div>
              {!collapsed && (
                <div>
                  <h1 className="text-lg font-semibold">Lancola Company</h1>
                  <p className="text-sm text-gray-500 mt-1">Admin Console</p>
                </div>
              )}
            </div>
            <button aria-label="Toggle sidebar" onClick={() => setCollapsed((c) => !c)} className="text-slate-500 hover:text-slate-700">
              {/* simple hamburger / chevron icon */}
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <nav className="px-2 py-4 space-y-1">
          <NavLink href="/admin" collapsed={collapsed} label="Dashboard"> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 01.894.553l7 14A1 1 0 0117 18H3a1 1 0 01-.894-1.447l7-14A1 1 0 0110 2z"/></svg>
          </NavLink>
          <NavLink href="/admin/products" collapsed={collapsed} label="Products">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a1 1 0 00-1 1v3a1 1 0 00.553.894l6 3a1 1 0 00.894 0l6-3A1 1 0 0018 7V4a1 1 0 00-1-1H4z"/></svg>
          </NavLink>
          <NavLink href="/admin/add-product" collapsed={collapsed} label="Add Product">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
          </NavLink>
          <NavLink href="/admin/orders" collapsed={collapsed} label="Orders">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6z"/></svg>
          </NavLink>
          <NavLink href="/admin/users" collapsed={collapsed} label="Users">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4a2 2 0 100 4 2 2 0 000-4zM3 18a7 7 0 0114 0H3z"/></svg>
          </NavLink>
          <NavLink href="/admin/settings" collapsed={collapsed} label="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11.983 1.386a1 1 0 00-1.966 0l-.2 1.35a7.002 7.002 0 00-1.347.78l-1.121-.565a1 1 0 00-1.115.26L3.68 5.245a1 1 0 00.26 1.115l.565 1.121a7.002 7.002 0 00-.78 1.347l-1.35.2a1 1 0 000 1.966l1.35.2c.14.477.36.93.64 1.347l-.565 1.121a1 1 0 00.26 1.115l1.415 1.415a1 1 0 001.115.26l1.121-.565c.417.28.87.5 1.347.64l.2 1.35a1 1 0 001.966 0l.2-1.35c.477-.14.93-.36 1.347-.64l1.121.565a1 1 0 001.115-.26l1.415-1.415a1 1 0 00.26-1.115l-.565-1.121c.28-.417.5-.87.64-1.347l1.35-.2a1 1 0 000-1.966l-1.35-.2a7.002 7.002 0 00-.64-1.347l.565-1.121a1 1 0 00-.26-1.115L16.32 3.18a1 1 0 00-1.115-.26l-1.121.565c-.417-.28-.87-.5-1.347-.64l-.2-1.35z"/></svg>
          </NavLink>
        </nav>

        <div className="mt-auto px-4 py-6">
          <div className="text-xs text-gray-400">© {new Date().getFullYear()} Lancola Company</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
                <p className="text-sm text-slate-500">Overview of your store and quick actions</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    // generate a simple CSV from mock orders in localStorage
                    try {
                      const raw = typeof window !== "undefined" ? localStorage.getItem("lancola_orders") : null;
                      const orders = raw ? JSON.parse(raw) : [];
                      if (!orders || orders.length === 0) {
                        alert("No orders available to generate a report.");
                        return;
                      }

                      const headers = ["id", "productId", "amount", "customerId"];
                      const rows = orders.map((o: any) => [o.id, o.productId, o.amount, o.customerId]);
                      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
                      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `lancola_orders_report_${new Date().toISOString()}.csv`;
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      URL.revokeObjectURL(url);
                    } catch (err) {
                      console.error(err);
                      alert("Failed to generate report.");
                    }
                  }}
                  className="text-sm px-3 py-2 bg-white border rounded-md"
                >
                  New Report
                </button>

                <button
                  onClick={() => router.push('/admin/add-product')}
                  className="text-sm px-3 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md"
                >
                  Create Product
                </button>
              </div>
            </div>

            <AdminStats />
          </div>

          {children}
        </div>
      </main>

    </div>
  );
}