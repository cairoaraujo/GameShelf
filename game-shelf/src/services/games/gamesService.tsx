import { api } from "../api/api";
import { Game } from "./interface";

export async function getGames(name: string): Promise<Game[]> {
    try {
      const data = await api("/games", { search: name, page_size: "10" });
      return data?.results || [];
    } catch (error) {
      console.error("Failed to fetch games:", error);
      return [];
    }
}

export async function deleteGame(){

}
