/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { getAllListsByUser, getListById, updateList } from "@/services/lists/listsService";
import { useSearchParams } from "next/navigation";

interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  tags: { id: number; name: string }[];
}

interface List {
  id: number;
  name: string;
  game: string | null;
}

async function fetchGames(query: string): Promise<Game[]> {
  const response = await fetch(
    `https://api.rawg.io/api/games?search=${query}&page_size=10&key=5f0821a82ff040d498edda14f97d1004`
  );
  const data = await response.json();
  return data.results || [];
}

function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchGames(query)
        .then((fetchedGames) => {
          setGames(fetchedGames);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
          setLoading(false);
        });
    }
  }, [query]);

  const openModal = async (game: Game) => {
    const userLists = await getAllListsByUser(1);
    setLists(userLists);
    setSelectedGame(game);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGame(null);
  };

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), 3000)
  };

  const addGameToListHandler = async (listId: number) => {
    if (!selectedGame) return;

    try {
      const list = await getListById(listId);

      if (!list) {
        showFeedback("The selected list does not exist.");
        return;
      }
      const parsedGameList = list.game ? JSON.parse(list.game) : [];
      const gameToAdd = {
        name: selectedGame.name,
        id: selectedGame.id,
        background_image: selectedGame.background_image,
      };
      const updatedGameList = [gameToAdd, ...parsedGameList];
      await updateList(listId, updatedGameList);

      showFeedback(`"${selectedGame.name}" was added successfully to the list "${list.name}"!`);
      closeModal();
    } catch (error) {
      console.error("Error adding game to list:", error);
      showFeedback("Failed to add the game. Please try again.");
    }
  };

  if (!query) {
    return <div className="p-4 text-center">Please enter a search term.</div>;
  }

  return (
    <div className="p-8 bg-stone-900 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold text-center">
        Search Results for {query}
      </h1>

      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg">
          {feedbackMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center text-white">Loading games...</div>
      ) : (
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
                onClick={() => openModal(game)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-black text-2xl font-bold mb-4">Select a List</h2>
            <ul className="space-y-2">
              {lists.map((list) => (
                <li
                  key={list.id}
                  className="text-black p-2 border rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => addGameToListHandler(list.id)}
                >
                  {list.name}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResultsPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPage />
    </Suspense>
  );
}