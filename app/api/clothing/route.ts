import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle FormData
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData(); // Parse FormData
    
    const name = formData.get("name")?.toString();
    const type = formData.get("type")?.toString();
    const color = formData.get("color")?.toString();
    const imageFile = formData.get("image") as File; // Extract the file
    
    if (!imageFile) {
      return new Response("No image uploaded", { status: 400 });
    }

    // Store the image file locally or in cloud storage
    // For local storage:
    const filePath = path.join(process.cwd(), "public/images", imageFile.name); 
    const buffer = await imageFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Now save clothing item data in the database
    const newItem = await prisma.clothing.create({
      data: {
        name: name!,
        type: type!,
        color: color!,
        picture: `/images/${imageFile.name}`, // Save the image path in the database
      },
    });

    return new Response(JSON.stringify(newItem), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding clothing item:", error);
    return new Response("Error adding clothing item", { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    // Fetch all clothing items from the database
    const clothingItems = await prisma.clothing.findMany();

    return new Response(JSON.stringify(clothingItems), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return new Response("Error fetching clothing items", { status: 500 });
  }
}