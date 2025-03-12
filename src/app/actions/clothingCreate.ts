// src/app/actions/clothingCreate.ts
"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function clothingCreate(name: string, type: "top" | "bottom" | "shoe", color: string, image: string) {
  try {
    const stmt = db.prepare("INSERT INTO clothing (name, type, color, image) VALUES (?, ?, ?, ?)");
    stmt.run(name, type, color, image);
    revalidatePath('/'); // Revalidate the home page BEFORE redirecting
  } catch (error) {
    console.error("Error creating clothing item:", error);
    throw new Error("Failed to create clothing item."); // Important: Re-throw the error
  }

  redirect('/'); // Redirect AFTER the try...catch block
}

export async function getClothingItems() {
  try {
    const stmt = db.prepare("SELECT * FROM clothing");
    const clothingItems = stmt.all();
    return clothingItems;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return []; // Or throw an error, depending on your error handling strategy
  }
}

export async function deleteClothingItem(id: number) {
    try {
      const stmt = db.prepare("DELETE FROM clothing WHERE id = ?");
      stmt.run(id);
      revalidatePath('/'); // Revalidate the home page
    } catch (error) {
      console.error("Error deleting clothing item:", error);
      throw new Error("Failed to delete clothing item."); // Important: Re-throw the error
    }
    revalidatePath('/');
  }