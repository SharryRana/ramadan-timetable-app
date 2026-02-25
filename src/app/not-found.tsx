import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
          <Compass className="h-7 w-7" />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-purple-300 mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-300 mb-8">
          The page you requested does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-medium text-white hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          <Home className="h-4 w-4" />
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
