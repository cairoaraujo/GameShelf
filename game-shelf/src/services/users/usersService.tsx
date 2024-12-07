import { User } from "@/interfaces/interfaces";

    export async function fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch("https://games-shelf-api.fly.dev/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
  
      const data: User[] = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return [];
    }
  }