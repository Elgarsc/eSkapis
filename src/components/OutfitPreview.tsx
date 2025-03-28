// src/components/OutfitPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface OutfitPreviewProps {
  topId: number | null;
  bottomId: number | null;
  shoeId: number | null;
  clothingItems: ClothingItem[];
}

interface ClothingItem {
  id: number;
  name: string;
  type: string;
  color?: string;
  image?: string;
}

export function OutfitPreview({ topId, bottomId, shoeId, clothingItems }: OutfitPreviewProps) {
  const [top, setTop] = useState<ClothingItem | null>(null);
  const [bottom, setBottom] = useState<ClothingItem | null>(null);
  const [shoes, setShoes] = useState<ClothingItem | null>(null);

  useEffect(() => {
    setTop(clothingItems.find((item) => item.id === topId && item.type === "top") || null);
  }, [topId, clothingItems]);

  useEffect(() => {
    setBottom(clothingItems.find((item) => item.id === bottomId && item.type === "bottom") || null);
  }, [bottomId, clothingItems]);

  useEffect(() => {
    setShoes(clothingItems.find((item) => item.id === shoeId && item.type === "shoe") || null);
  }, [shoeId, clothingItems]);

  return (
    <div className="p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Outfit Preview</h3>
      <div className="space-y-6">
        {top && (
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={top.image || "/placeholder.svg"}
              alt={top.name || "No top selected"}
              fill
              className="rounded object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        {bottom && (
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={bottom.image || "/placeholder.svg"}
              alt={bottom.name || "No bottom selected"}
              fill
              className="rounded object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        {shoes && (
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src={shoes.image || "/placeholder.svg"}
              alt={shoes.name || "No shoes selected"}
              fill
              className="rounded object-cover"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}