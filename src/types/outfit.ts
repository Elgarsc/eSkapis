// src/types/outfit.ts
export interface Outfit {
  id: string;
  name: string;
  top: IClothingItem;
  bottom: IClothingItem;
  shoes: IClothingItem;
  tags: string[];
}

export interface IClothingItem {
  id: number;
  name: string;
  image: string;
  color: string;
  type: string;
}
