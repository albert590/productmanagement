"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="app-container px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">

            <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              PM
            </div>

            <div>
              <div className="text-lg font-semibold text-slate-900">
                Product Management
              </div>

              <div className="text-xs text-slate-500">
                Simple catalog & admin
              </div>
            </div>

          </Link>
        </div>


        {/* Search */}
        <div className="flex-1 px-6">
          <div className="max-w-xl mx-auto">

            <input
              placeholder="Search products, categories..."
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
            />

          </div>
        </div>



        {/* Navigation */}
        <nav className="flex items-center gap-4">

          <Link
            href="/products"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Products
          </Link>


          <Link
            href="/cart"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Cart
          </Link>



          {isAuthenticated && (
            <>

              <Link
                href="/admin"
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                Admin
              </Link>


              <Link
                href="/admin/orders"
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                Orders
              </Link>


              <Link
                href="/admin/add-product"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-md text-sm shadow"
              >
                Sell with us
              </Link>

            </>
          )}



          {!isAuthenticated ? (

            <>

              <Link
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </Link>


              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Register
              </Link>

            </>


          ) : (

            <>

              <span className="text-sm text-slate-700">
                Hi, {user?.name}
              </span>


              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>

            </>

          )}


        </nav>

      </div>
    </header>
  );
}