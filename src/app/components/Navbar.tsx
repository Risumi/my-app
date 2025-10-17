import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-semibold text-gray-900 hover:opacity-80">
          My App
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/wedding" className="text-gray-700 hover:text-gray-900">
            Wedding
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
