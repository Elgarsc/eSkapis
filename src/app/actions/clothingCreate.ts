// src/app/actions/clothingCreate.ts
"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { auth } from "@clerk/nextjs/server";

export async function clothingCreate(name: string, type: "top" | "bottom" | "shoe", color: string, image: string, userId: string) {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const stmt = db.prepare("INSERT INTO clothing (name, type, color, image, user_id) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, type, color, image, userId);
    revalidatePath('/');
  } catch (error) {
    console.error("Error creating clothing item:", error);
    throw new Error("Failed to create clothing item.");
  }

  revalidatePath('/');
}

export async function getClothingItems() {
  const { userId } = await auth(); // Get the user ID

  if (!userId) {
    return []; // Or throw an error, depending on your needs
  }

  try {
    const stmt = db.prepare("SELECT * FROM clothing WHERE user_id = ?");
    const clothingItems = stmt.all(userId);
    return clothingItems;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
}

export async function deleteClothingItem(id: number) {
  const { userId } = await auth(); // Get the user ID

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const stmt = db.prepare("DELETE FROM clothing WHERE id = ? AND user_id = ?");
    stmt.run(id, userId);
    revalidatePath('/');
  } catch (error) {
    console.error("Error deleting clothing item:", error);
    throw new Error("Failed to delete clothing item.");
  }
  revalidatePath('/');
}