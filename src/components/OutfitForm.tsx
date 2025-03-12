// src/components/OutfitForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getClothingItems } from "@/app/actions/clothingCreate";
import { createOutfit } from "@/app/actions/outfitActions";

interface OutfitFormProps {
  refreshOutfits: () => void;
}

interface ClothingItem {
  id: number;
  name: string;
  type: string;
  color?: string; 
  image?: string; 
}

export function OutfitForm({ refreshOutfits }: OutfitFormProps) {
  const [name, setName] = useState("");
  const [topId, setTopId] = useState<number | null>(null);
  const [bottomId, setBottomId] = useState<number | null>(null);
  const [shoeId, setShoeId] = useState<number | null>(null);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]); // Explicit type annotation
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getClothingItems();
      console.log("Data from getClothingItems:", items);
      setClothingItems(items);
    };
    fetchItems();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!name || !topId || !bottomId || !shoeId) {
      setError("Please complete all fields.");
      return;
    }

    try {
      await createOutfit(name, topId, bottomId, shoeId);
      setName("");
      setTopId(null);
      setBottomId(null);
      setShoeId(null);
      refreshOutfits();
    } catch (err: any) {
      console.error("Failed to create outfit:", err);
      setError(err.message || "Failed to create outfit.");
    }
  };

  const getItemsByType = (type: string) => {
    return clothingItems.filter((item: ClothingItem) => item.type === type);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Outfit Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Outfit name" />
      </div>

      <div>
        <label htmlFor="top" className="block text-sm font-medium text-gray-700">Top</label>
        <Select value={topId ? topId.toString() : ""} onValueChange={(value) => setTopId(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Top" />
          </SelectTrigger>
          <SelectContent>
            {getItemsByType("top").map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="bottom" className="block text-sm font-medium text-gray-700">Bottom</label>
        <Select value={bottomId ? bottomId.toString() : ""} onValueChange={(value) => setBottomId(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Bottom" />
          </SelectTrigger>
          <SelectContent>
            {getItemsByType("bottom").map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="shoe" className="block text-sm font-medium text-gray-700">Shoes</label>
        <Select value={shoeId ? shoeId.toString() : ""} onValueChange={(value) => setShoeId(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Shoes" />
          </SelectTrigger>
          <SelectContent>
            {getItemsByType("shoe").map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Create Outfit</Button>
    </form>
  );
}