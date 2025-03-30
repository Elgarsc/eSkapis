// src/app/outfits/page.tsx
"use client";

import { useEffect, useState } from "react";
import { OutfitForm } from "@/components/OutfitForm";
import OutfitsGrid from "@/components/outfits-grid";
import { getOutfits, updateOutfitTags, deleteOutfit } from "@/app/actions/outfitActions";
import type { Outfit } from "@/types/outfit";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const refreshOutfits = async () => {
    const outfitsData = await getOutfits();
    setOutfits(outfitsData);
  };

  useEffect(() => {
    refreshOutfits();
  }, []);

  const handleAddTag = async (outfitId: string, tag: string) => {
    const outfit = outfits.find((outfit) => outfit.id === outfitId);
    if (outfit) {
      const updatedTags = [...outfit.tags, tag];
      await updateOutfitTags(outfitId, updatedTags);
      refreshOutfits();
    }
  };

  const handleRemoveTag = async (outfitId: string, tagToRemove: string) => {
    const outfit = outfits.find((outfit) => outfit.id === outfitId);
    if (outfit) {
      const updatedTags = outfit.tags.filter((tag) => tag !== tagToRemove);
      await updateOutfitTags(outfitId, updatedTags);
      refreshOutfits();
    }
  };

  const handleDeleteOutfit = async (outfitId: string) => {
    await deleteOutfit(outfitId);
    refreshOutfits();
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Outfit</h1>
      <OutfitForm refreshOutfits={refreshOutfits} />
      <h2 className="text-xl font-bold mt-8 mb-4">Outfits</h2>
      <OutfitsGrid
        outfits={outfits}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onDeleteOutfit={handleDeleteOutfit}
      />
    </main>
  );
}