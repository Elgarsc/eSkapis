// src/components/outfit-card.tsx
"use client"

import type React from "react"

import { useState, useCallback } from "react"
import type { Outfit } from "@/types/outfit"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OutfitCardProps {
  outfit: any
  onAddTag: (outfitId: string, tag: string) => void
  onRemoveTag: (outfitId: string, tag: string) => void
  onDeleteOutfit: (outfitId: string) => void
}

export default function OutfitCard({ outfit, onAddTag, onRemoveTag, onDeleteOutfit }: OutfitCardProps) {
  const [newTag, setNewTag] = useState("")

  const handleAddTag = useCallback(() => {
    if (newTag.trim()) {
      onAddTag(outfit.id, newTag.trim())
      setNewTag("")
    }
  }, [newTag, outfit.id, onAddTag]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTag()
    }
  }

  return (
    <Card className="overflow-hidden relative"> 
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 rounded-full" 
        onClick={() => onDeleteOutfit(outfit.id)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{outfit.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <div className="bg-muted rounded-md w-full aspect-square mb-2 overflow-hidden">
              <img
                src={outfit.top.image || "/placeholder.svg"}
                alt={outfit.top.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-center">{outfit.top.name}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted rounded-md w-full aspect-square mb-2 overflow-hidden">
              <img
                src={outfit.bottom.image || "/placeholder.svg"}
                alt={outfit.bottom.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-center">{outfit.bottom.name}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted rounded-md w-full aspect-square mb-2 overflow-hidden">
              <img
                src={outfit.shoes.image || "/placeholder.svg"}
                alt={outfit.shoes.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-center">{outfit.shoes.name}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {outfit.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button onClick={() => onRemoveTag(outfit.id, tag)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag..."
            className="flex-1"
          />
          <Button size="sm" onClick={handleAddTag}>
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}