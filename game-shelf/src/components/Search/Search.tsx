"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/results?query=${query}`);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-[1000px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a game..."
        className="w-full my-16 px-4 py-4 mb-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={()=>handleSearch()}
        className="px-4 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}