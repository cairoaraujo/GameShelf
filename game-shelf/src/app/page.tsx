import SearchInput from "../components/Search/Search";
import GameList from "@/components/GameList/GameList";
import { fetchUsers } from "@/services/users/usersService";
import { getAllListsByUser } from "@/services/lists/listsService";
import { List } from "@/interfaces/interfaces";

export default async function Home() {

  const users = await fetchUsers()
  const lists:List[] = await getAllListsByUser(1)
  return (
    <div className="flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl">Welcome back, {users[0].name}!</h1>
      <SearchInput/>
      {lists?.map((list) => (
  <div key={list.id}  className="w-full">
    <GameList id={list.id} name={list.name} game={list.game}></GameList>
  </div>
))}
    </div>
  );
}
