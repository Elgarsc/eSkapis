// src/components/outfits-grid.tsx
"use client"

import { useState, useCallback } from "react"
import type { Outfit } from "@/types/outfit"
import  OutfitCard  from "./outfit-card"

interface OutfitsGridProps {
  outfits: Outfit[]
  onAddTag: (outfitId: string, tag: string) => void
  onRemoveTag: (outfitId: string, tag: string) => void
  onDeleteOutfit: (outfitId: string) => void
}

export default function OutfitsGrid({ outfits, onAddTag, onRemoveTag, onDeleteOutfit }: OutfitsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {outfits.map((outfit) => (
        <OutfitCard
          key={outfit.id}
          outfit={outfit}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          onDeleteOutfit={onDeleteOutfit} 
        />
      ))}
    </div>
  )
}