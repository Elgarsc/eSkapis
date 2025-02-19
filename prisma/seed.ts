import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const dummyClothingItems = [
  { name: "Blue T-Shirt", type: "tops", color: "blue", picture: "https://hourscollection.com/cdn/shop/files/BlankRoyalBlueTeeproduct_1.jpg?v=1688656338" },
  { name: "White Blouse", type: "tops", color: "white", picture: "/placeholder.svg?text=White+Blouse" },
  { name: "Black Jeans", type: "bottoms", color: "black", picture: "/placeholder.svg?text=Black+Jeans" },
  { name: "Khaki Pants", type: "bottoms", color: "beige", picture: "/placeholder.svg?text=Khaki+Pants" },
  { name: "Red Sneakers", type: "shoes", color: "red", picture: "/placeholder.svg?text=Red+Sneakers" },
  { name: "Brown Loafers", type: "shoes", color: "brown", picture: "/placeholder.svg?text=Brown+Loafers" },
]

async function main() {
  for (const item of dummyClothingItems) {
    await prisma.clothing.create({ data: item })
  }
  console.log("✅ Dummy clothing items added!")
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
