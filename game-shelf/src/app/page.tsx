import SearchInput from "../components/Search/Search";
import GameList from "@/components/GameList/GameList";
import { fetchUsers } from "@/services/users/usersService";
import { getAllListsByUser } from "@/services/lists/listsService";

export default async function Home() {
  //const games: Game[] = await getGames('red dead redemption 2')
  const users = await fetchUsers()
  const listas = await getAllListsByUser(1)
  console.log(users[0].name)
  return (
    <div className="flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl">Welcome back, {users[0].name}!</h1>
      <SearchInput/>
      {/*games != undefined ? games[0].name : 'not found'*/}
      {listas?.map((lista) => (
  <div key={lista.id}>
    <GameList listTitle={lista.name} gameList={lista.game}></GameList>
  </div>
))}
    </div>
  );
}
