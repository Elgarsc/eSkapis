// src/components/ClothingList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { deleteClothingItem } from "@/app/actions/clothingCreate";
import { useRouter } from "next/navigation";

interface ClothingItemProps {
  id: number;
  name: string;
  type: string;
  color: string;
  image: string;
  refreshClothingItems: () => void;
}

function ClothingItem({ id, name, type, color, image, refreshClothingItems }: ClothingItemProps) {
  const router = useRouter();

  const handleDeleteClick = async () => {
    await deleteClothingItem(id);
    router.refresh();
    refreshClothingItems();
  };

  return (
    <div key={id} className="border p-4 rounded-md shadow-sm relative">
      <div
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={handleDeleteClick}
      >
        <Button variant="ghost" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <img src={image} alt={name} className="w-full h-68 object-cover mb-2 rounded-md" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>Type: {type}</p>
      <p>Color: {color}</p>
    </div>
  );
}

interface ClothingListProps {
  clothingItems: any[];
  refreshClothingItems: () => void;
}

export function ClothingList({ clothingItems, refreshClothingItems }: ClothingListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.isArray(clothingItems) ? ( // Add this check
        clothingItems.map((item) => (
          <ClothingItem key={item.id} {...item} refreshClothingItems={refreshClothingItems} />
        ))
      ) : (
        <div>No clothing items found.</div> // Or a loading indicator
      )}
    </div>
  );
}