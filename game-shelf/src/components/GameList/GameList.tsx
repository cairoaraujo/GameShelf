/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Game, List } from "@/interfaces/interfaces";


export default function GameList({id, name, game }: Partial<List>) {
  const [addedGames, setAddedGames] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      if (game){
        const parsedGameList = JSON.parse(game);
        if (Array.isArray(parsedGameList)) {
          setAddedGames(parsedGameList);
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, [game]);

  const handleTitleClick = () => {
    router.push(`/list/${id}`);
  };

  return (
    <div className="p-8 max-w-5xl w-full mx-auto">
      <div>
        <h2
          className="text-2xl font-bold mb-4 text-left flex items-center cursor-pointer hover:underline"
          onClick={handleTitleClick}
        >
          {name}
          {addedGames.length !== 0 && (
            <span className="ml-2 text-lg text-gray-500">({addedGames.length} games)</span>
          )}
        </h2>
      </div>
      {addedGames.length === 0 ? (
        <h1 className="text-left text-gray-500">Empty list. Add a game!</h1>
      ) : (
        <div className="overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={3}
            className="rounded-lg shadow-lg"
          >
            {addedGames.map((game) => (
              <SwiperSlide key={game.id}>
                <div className="flex flex-col items-center">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-48 h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">{game.name}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}