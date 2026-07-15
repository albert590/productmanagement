export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-transparent">
      <div className="app-container px-4 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <div className="text-sm font-semibold">Product Management</div>
          <div className="text-xs text-slate-500 mt-1">Helping sellers list and manage products quickly.</div>
        </div>

        <div className="mt-4 sm:mt-0 text-sm text-slate-500">
          © {new Date().getFullYear()} Lancola Company — All rights reserved
        </div>
      </div>
    </footer>
  );
}