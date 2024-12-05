"use client";
import { useState } from "react";
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

export default function GameList({listTitle}:{listTitle:string}) {
  const [playedGames, setPlayedGames] = useState<Game[]>([
    {
      id: 1,
      name: "The Witcher 3: Wild Hunt",
      background_image:
        "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
    },
    {
      id: 2,
      name: "Cyberpunk 2077",
      background_image:
        "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
    },
    {
      id: 3,
      name: "Red Dead Redemption 2",
      background_image:
        "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
    },
    {
        id: 4,
        name: "Red Dead Redemption 2",
        background_image:
          "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
      },
  ]);

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