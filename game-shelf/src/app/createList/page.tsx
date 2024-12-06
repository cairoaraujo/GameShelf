"use client";

import { createList } from "@/services/lists/listsService";
import { useState } from "react";

export default function CreateListPage() {
  const [listName, setListName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage(null);

    try {
      await createList(1, listName);
      setFeedbackMessage("List created successfully!");
    } catch (error) {
      console.error("Error creating list:", error);
      setFeedbackMessage("Failed to create the list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Create a new Game List</h1>
      <form onSubmit={handleCreateList} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
            List name
          </label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {feedbackMessage && (
        <div
          className={`mt-4 px-4 py-2 rounded-lg text-white ${
            feedbackMessage.includes("successfully") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}