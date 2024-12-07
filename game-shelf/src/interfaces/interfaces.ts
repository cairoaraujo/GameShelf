export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  tags: { id: number; name: string }[];
}
  
export interface List {
  id: number;
  name: string;
  user_id: number;
  game: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface User{
  name: string;
  email: string;
  password: string;
}