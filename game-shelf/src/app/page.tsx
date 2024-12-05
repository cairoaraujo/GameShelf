import { getGames } from "@/services/games/gamesService";
import { Game } from "@/services/games/interface";
import SearchInput from "../components/Search/Search";
import GameList from "@/components/GameList/GameList";

export default async function Home() {
  const games: Game[] = await getGames('red dead redemption 2')
  console.log(games)
  const imagem = games[0].background_image
  return (
    <div className="flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl">Welcome back, Cairo!</h1>
      <SearchInput/>
      {/*games != undefined ? games[0].name : 'not found'*/}
      <GameList listTitle="Favoritos"/>
      <GameList listTitle="Wishlist"/>
      <GameList listTitle="Piores"/>
    </div>
  );
}
