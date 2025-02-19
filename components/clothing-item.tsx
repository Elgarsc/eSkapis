//.../clothing-item.tsx

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ClothingItemProps = {
  item: {
    id: string
    name: string
    category: string
    color: string
    image: string
  }
}

export function ClothingItem({ item }: ClothingItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <Badge variant="secondary" style={{ backgroundColor: item.color }}>
          {item.color}
        </Badge>
      </CardFooter>
    </Card>
  )
}

