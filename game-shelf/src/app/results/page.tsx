/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";
import { getListById, updateList } from "@/services/lists/listsService";
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
    return <div className="p-4 text-center">Please enter a search term.</div>;
  }

  const games = await fetchGames(query);

  async function addGameToListHandler(game: Game){
    const list = await getListById(1)
    const parsedGameList = JSON.parse(list.game)
    const gameToAdd = 
      {
      name: game.name,
      id: game.id,
      background_image: game.background_image,
      }
    const updatedGameList = [gameToAdd, ...parsedGameList]; 
    const updatedList = await updateList(1, updatedGameList); 
    console.log("Updated List:", updatedList);
  }

  return (
    <div className="p-8 bg-stone-900 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-center">
        Search Results for "{query}"
      </h1>
      <ul className="space-y-6 max-w-4xl mx-auto">
        {games.map((game) => (
          <li
            key={game.id}
            className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-md"
          >
            {game.background_image && (
              <img
                src={game.background_image}
                alt={game.name}
                className="w-36 h-36 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{game.name}</h2>
              <p className="text-gray-600">Released: {game.released}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              onClick={()=>addGameToListHandler(game)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}