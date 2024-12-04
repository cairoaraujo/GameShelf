"use client"
import { useSearchParams } from "next/navigation";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  tags: { id: number; name: string }[];
}

async function fetchGames(query: string): Promise<Game[]> {
  const response = await fetch(
    `https://api.rawg.io/api/games?search=${query}&page_size=10&key=5f0821a82ff040d498edda14f97d1004`
  );
  const data = await response.json();
  return data.results || [];
}

export default async function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  if (!query) {
    return <div className="p-4">Please enter a search term.</div>;
  }

  const games = await fetchGames(query);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Search Results for "{query}"</h1>
      <ul className="grid gap-4">
        {games.map((game) => (
          <li key={game.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <p className="text-gray-600">Released: {game.released}</p>
                          {/* Tags do Jogo */}
                          <div className="mt-2 flex flex-wrap gap-2">
                {game.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            {game.background_image && (
              <img
                src={game.background_image}
                alt={game.name}
                className="w-36 h-36 object-cover rounded-lg"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}