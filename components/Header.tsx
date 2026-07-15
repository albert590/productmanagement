import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="app-container px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">PM</div>
            <div>
              <div className="text-lg font-semibold text-slate-900">Product Management</div>
              <div className="text-xs text-slate-500">Simple catalog & admin</div>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-6">
          <div className="max-w-xl mx-auto">
            <input placeholder="Search products, categories..." className="w-full border rounded-md px-3 py-2 text-sm bg-white" />
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/products" className="text-sm text-slate-700 hover:text-slate-900">Products</Link>
          <Link href="/admin" className="text-sm text-slate-700 hover:text-slate-900">Admin</Link>
          <Link href="/cart" className="text-sm text-slate-700 hover:text-slate-900">Cart</Link>
          <Link href="/admin/add-product" className="ml-3 inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-md text-sm shadow">Sell with us</Link>
        </nav>
      </div>
    </header>
  );
}