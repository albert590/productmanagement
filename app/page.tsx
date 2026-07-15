import Link from "next/link";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-100">
          Product Management System
        </p>
        <h1 className="text-4xl font-bold">
          Manage your inventory, catalog, and storefront in one place.
        </h1>
        <p className="mt-4 max-w-2xl text-blue-100">
          Browse your products, inspect details, and access the admin dashboard to keep everything organized.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Browse Products
          </Link>
          <Link
            href="/admin"
            className="rounded-lg border border-white/40 px-4 py-2 font-semibold text-white hover:bg-white/10"
          >
            Open Admin Panel
          </Link>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-blue-600 hover:underline">
            View all
          </Link>
        </div>
        <ProductList />
      </div>
    </section>
  );
}