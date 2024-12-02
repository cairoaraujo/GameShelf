import { api } from "@/services/api/api";
import { getGames } from "@/services/games/gamesService";
import { Game } from "@/services/games/interface";

export default async function Home() {
  const games: Game[] = await getGames('red dead redemption 2')
  console.log(games)
  const imagem = games[0].background_image
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Hello World</h1>
      {games != undefined ? games[0].name : 'nao rolou'}
      <img src={imagem}></img>
      {games[0].released}
    </div>
  );
}
