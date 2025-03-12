// src/app/page.tsx
"use client";

import { AddItemForm } from "@/components/AddItemForm";
import { ClothingList } from "@/components/ClothingList";
import { OutfitForm } from "@/components/OutfitForm";
import { getClothingItems } from "@/app/actions/clothingCreate";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [clothingItems, setClothingItems] = useState([]);
  const router = useRouter();

  const refreshClothingItems = async () => {
    const items = await getClothingItems();
    setClothingItems(items);
  };

  useEffect(() => {
    refreshClothingItems();
  }, []);

  const handleOutfitCreated = () => {
    router.push('/outfits');
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Clothing Item</h1>
      <AddItemForm refreshClothingItems={refreshClothingItems} />
      <h2 className="text-xl font-bold mt-8 mb-4">Clothing Items</h2>
      <ClothingList clothingItems={clothingItems} refreshClothingItems={refreshClothingItems} />
      <h2 className="text-xl font-bold mt-8 mb-4">Create Outfit</h2>
      <OutfitForm refreshOutfits={handleOutfitCreated} />
    </main>
  );
}