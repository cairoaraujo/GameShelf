import { api } from "../api/api";
import { Game } from "./interface";

export async function getGames(name:string): Promise<Game[]>{
    const response = await api('/games', {search: name})
    console.log(response?.results)
    return response?.results
}