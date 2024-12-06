"use client"
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteList, getListById, updateList } from "@/services/lists/listsService";
import { List } from "@/models/list";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface ListPageProps {
  params: { listId: string };
}

export default function ListPage({ params }: ListPageProps) {
  const { listId } = params;
  const router = useRouter();
  const [list, setList] = useState<List | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (message: string) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const fetchListData = async (id: string) => {
    try {
      const list = await getListById(Number(id));
      setList(list);
      setGames(list?.game ? JSON.parse(list.game) : []);
    } catch (error) {
      console.error("Error fetching list:", error);
      showFeedback("Failed to fetch the list. Please try again.");
    }
  };

  useEffect(() => {
    if (listId) {
      fetchListData(listId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const handleDeleteList = async () => {
    try {
      await deleteList(Number(listId));
      showFeedback("List deleted successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error deleting list:", error);
      showFeedback("Failed to delete the list. Please try again.");
    }
  };

  const handleRemoveGame = async (gameId: number) => {
    try {
      await removeGameFromList(listId, gameId);
      setGames((prev) => prev.filter((game) => game.id !== gameId));
      showFeedback("Game removed successfully.");
    } catch (error) {
      console.error("Error removing game:", error);
      showFeedback("Failed to remove the game. Please try again.");
    }
  };

  const removeGameFromList = async (listId: string, gameId: number) => {
    if (!gameId) return;

    try {
      const list = await getListById(Number(listId))

      if (!list) {
        showFeedback("The selected list does not exist.");
        return;
      }
      const parsedGameList = list.game ? JSON.parse(list.game) : [];
      const updatedGameList = parsedGameList.filter((game: Game) => game.id !== gameId);

      await updateList(Number(listId), updatedGameList)

      const gameToRemove = parsedGameList.find((game: Game) => game.id === gameId);
      showFeedback(`"${gameToRemove?.name}" was removed successfully from the list "${list.name}"!`);

    } catch (error) {
      console.error("Error removing game from list:", error);
      showFeedback("Failed to remove the game. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{list?.name || "Loading..."}</h2>
      <button
        onClick={handleDeleteList}
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-600"
      >
        Delete List
      </button>
      {games.length === 0 ? (
        <p className="text-gray-500">The list is empty. Add some games!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-48 h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold mb-2 text-black">{game.name}</h3>
              <button
                onClick={() => handleRemoveGame(game.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove Game
              </button>
            </div>
          ))}
        </div>
      )}
      {feedbackMessage && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}