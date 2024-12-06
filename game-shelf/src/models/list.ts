export interface Game {
    id: number;
    name: string;
    background_image: string;
  }
  
  export interface List {
    id: number;
    name: string;
    user_id: number;
    game: string | null;
    createdAt?: string;
    updatedAt?: string;
  }