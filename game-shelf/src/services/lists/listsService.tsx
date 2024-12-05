export async function createList(userId: number, listName: string): Promise<{ id: number; name: string; user_id: number } | null> {
    try {
        console.log('acessou createList')
        console.log(userId)
        console.log(listName)
      const response = await fetch(`https://games-shelf-api.fly.dev/users/${userId}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: listName, user_id: userId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating list: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create list:", error);
      return null;
    }
}
export async function getList(userId: number): Promise<{ id: number; name: string; user_id: number } | null> {
    try {
      const response = await fetch(`https://games-shelf-api.fly.dev/users/${userId}/lists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error creating list: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create list:", error);
      return null;
    }
}
interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
}
  
export async function updateList(
  listId: number,
  games: { name: string; id: number; background_image: string }[]
): Promise<{ id: number; name: string; game: string; user_id: number } | null> {
  try {
    console.log('acessou updateList')
    console.log(listId)
    console.log(games)
    const gameString = JSON.stringify(games); // Converter array de jogos para string JSON
    console.log(gameString)
    const response = await fetch(`https://games-shelf-api.fly.dev/lists/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game: gameString,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error updating list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update list:", error);
    return null;
  }
}
  