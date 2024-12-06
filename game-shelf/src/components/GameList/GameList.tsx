/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default function GameList({listTitle, gameList}:{listTitle:string, gameList:string}) {
  console.log('IHAAAUA')
  console.log(gameList)
  console.log(listTitle)
  const [playedGames, setPlayedGames] = useState<Game[]>([]);

  useEffect(() => {
    try {
      const parsedGameList = JSON.parse(gameList);
      if (Array.isArray(parsedGameList)) {
        setPlayedGames(parsedGameList);
      }
    } catch (error) {
      console.error("Erro ao analisar gameList:", error);
    }
  }, [gameList]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{listTitle}</h2>
      <div className="overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={3}
          className="rounded-lg shadow-lg"
        >
          {playedGames.map((game) => (
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
    </div>
  );
}