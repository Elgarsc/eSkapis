// src/app/actions/clothingCreate.ts
"use server";

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { IClothingItem } from "@/types/outfit";

function containsSQLInjectionRisk(input: string): boolean {
  const forbiddenChars = /[;'"/*\\]/;
  return forbiddenChars.test(input);
}

export async function clothingCreate(name: string, type: "top" | "bottom" | "shoe", color: string, image: string, userId: string) {
  if (!userId) {
    throw Error("User not authenticated");
  }
  if (
    containsSQLInjectionRisk(userId) ||
    containsSQLInjectionRisk(color) ||
    containsSQLInjectionRisk(name)
  ) {
    throw new Error("Contains forbidden characters");
  }
  try {
    const stmt = db.prepare("INSERT INTO clothing (name, type, color, image, user_id) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, type, color, image, userId);
  } catch (error) {
    console.error("Error creating clothing item:", error);
    throw new Error("Failed to create clothing item.");
  }
}

export async function getClothingItems(): Promise<IClothingItem[]>  {
  const { userId } = await auth(); 

  if (!userId) {
    return []; 
  }

  try {
    const stmt = db.prepare("SELECT * FROM clothing WHERE user_id = ?");
    const clothingItems = stmt.all(userId) as IClothingItem[];;
    return clothingItems;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
}

export async function deleteClothingItem(id: number) {
  const { userId } = await auth(); 

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const stmt = db.prepare("DELETE FROM clothing WHERE id = ? AND user_id = ?");
    stmt.run(id, userId);
  } catch (error) {
    console.error("Error deleting clothing item:", error);
    throw new Error("Failed to delete clothing item.");
  }
}