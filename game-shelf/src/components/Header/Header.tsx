import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 h-[50px] flex items-center justify-between px-8 text-white">
      <div className="text-xl font-semibold">
        <Link href="/">gameshelf</Link>
      </div>
      <nav className="space-x-4">
      <Link href="/createList" className="hover:text-gray-300">
          Create list
        </Link>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/profile" className="hover:text-gray-300">
          Profile
        </Link>
      </nav>
    </header>
  );
}