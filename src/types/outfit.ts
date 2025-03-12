// src/types/outfit.ts
export interface Outfit {
  id: string;
  name: string;
  top: ClothingItem;
  bottom: ClothingItem;
  shoes: ClothingItem;
  tags: string[];
}

export interface ClothingItem {
  id: number;
  name: string;
  image: string;
}