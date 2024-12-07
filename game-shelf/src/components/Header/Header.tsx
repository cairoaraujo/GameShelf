import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#060944] h-[68px] flex items-center justify-between px-8 text-white">
      <div className="text-4xl font-semibold">
        <Link href="/">GAMESHELF</Link>
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