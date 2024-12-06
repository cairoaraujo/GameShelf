"use client";
import { fetchUsers } from "@/services/users/usersService";
import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        setName(data[0]?.name || "");
        setEmail(data[0]?.email || "");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateUser = async () => {
    if (!name || !email) {
      setFeedbackMessage("Name and email cannot be empty.");
      return;
    }

    try {
      const response = await fetch("https://games-shelf-api.fly.dev/users/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      setFeedbackMessage("User updated successfully!");
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating user:", error);
      setFeedbackMessage("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-900 p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Profile</h1>


      {feedbackMessage && (
        <div
          className={`mb-4 p-2 rounded ${
            feedbackMessage.includes("successfully")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {feedbackMessage}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-black mt-1 text-lg">{name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-black mt-1 text-lg">{email}</p>
          )}
        </div>

        <div className="flex justify-between">
          {isEditing ? (
            <button
              onClick={handleUpdateUser}
              className="w-32 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-32 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Edit
            </button>
          )}

          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="w-32 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}