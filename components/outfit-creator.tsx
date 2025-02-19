"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OutfitPreview } from "./outfit-preview"

type ClothingItem = {
  id: string
  name: string
  category: string
  color: string
  image: string
}

type OutfitCreatorProps = {
  clothingItems: ClothingItem[]
}

export function OutfitCreator({ clothingItems }: OutfitCreatorProps) {
  const [top, setTop] = useState<ClothingItem | null>(null)
  const [bottom, setBottom] = useState<ClothingItem | null>(null)
  const [shoes, setShoes] = useState<ClothingItem | null>(null)

  const handleCreateOutfit = () => {
    console.log("Created outfit:", { top, bottom, shoes })
    // Here you would typically save this outfit or update state
  }

  const filterItemsByCategory = (category: string) => clothingItems.filter((item) => item.category === category)

  const handleSelectItem = (category: "tops" | "bottoms" | "shoes", itemId: string) => {
    const selectedItem = clothingItems.find((item) => item.id === itemId) || null
    switch (category) {
      case "tops":
        setTop(selectedItem)
        break
      case "bottoms":
        setBottom(selectedItem)
        break
      case "shoes":
        setShoes(selectedItem)
        break
    }
  }

  const handleSwitch = (category: "tops" | "bottoms" | "shoes", direction: "prev" | "next") => {
    const items = filterItemsByCategory(category)
    let currentIndex = items.findIndex(
      (item) => item.id === (category === "tops" ? top?.id : category === "bottoms" ? bottom?.id : shoes?.id),
    )

    if (currentIndex === -1) {
      currentIndex = 0
    } else {
      currentIndex =
        direction === "next" ? (currentIndex + 1) % items.length : (currentIndex - 1 + items.length) % items.length
    }

    handleSelectItem(category, items[currentIndex].id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="top" className="block text-sm font-medium text-gray-700">
            Top
          </label>
          <Select value={top?.id || ""} onValueChange={(value) => handleSelectItem("tops", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a top" />
            </SelectTrigger>
            <SelectContent>
              {filterItemsByCategory("tops").map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="bottom" className="block text-sm font-medium text-gray-700">
            Bottom
          </label>
          <Select value={bottom?.id || ""} onValueChange={(value) => handleSelectItem("bottoms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a bottom" />
            </SelectTrigger>
            <SelectContent>
              {filterItemsByCategory("bottoms").map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="shoes" className="block text-sm font-medium text-gray-700">
            Shoes
          </label>
          <Select value={shoes?.id || ""} onValueChange={(value) => handleSelectItem("shoes", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select shoes" />
            </SelectTrigger>
            <SelectContent>
              {filterItemsByCategory("shoes").map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCreateOutfit}>Create Outfit</Button>
      </div>
      <OutfitPreview top={top} bottom={bottom} shoes={shoes} onSwitch={handleSwitch} />
    </div>
  )
}
