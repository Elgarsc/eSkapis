import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type ClothingItem = {
  id: string
  name: string
  category: string
  color: string
  image: string
}

type OutfitPreviewProps = {
  top: ClothingItem | null
  bottom: ClothingItem | null
  shoes: ClothingItem | null
  onSwitch: (category: "tops" | "bottoms" | "shoes", direction: "prev" | "next") => void
}

export function OutfitPreview({ top, bottom, shoes, onSwitch }: OutfitPreviewProps) {
  const renderItem = (item: ClothingItem | null, category: "tops" | "bottoms" | "shoes") => (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        onClick={() => onSwitch(category, "prev")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="relative w-40 h-40 mx-auto">
        <Image
          src={item?.image || "/placeholder.svg"}
          alt={item?.name || "No item selected"}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        onClick={() => onSwitch(category, "next")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Outfit Preview</h3>
      <div className="space-y-6">
        {renderItem(top, "tops")}
        {renderItem(bottom, "bottoms")}
        {renderItem(shoes, "shoes")}
      </div>
    </div>
  )
}

