// src/app/actions/outfitActions.ts
"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function createOutfit(name: string, topId: number, bottomId: number, shoeId: number, tags: string[]) {
  const { userId } = await auth(); 

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const stmt = db.prepare("INSERT INTO outfits (name, top_id, bottom_id, shoe_id, user_id) VALUES (?, ?, ?, ?, ?)");
    const result = stmt.run(name, topId, bottomId, shoeId, userId);
    const outfitId = result.lastInsertRowid;

    for (const tag of tags) {
      const tagStmt = db.prepare("INSERT INTO tags (name) VALUES (?) ON CONFLICT(name) DO NOTHING");
      tagStmt.run(tag);

      const tagIdStmt = db.prepare("SELECT id FROM tags WHERE name = ?");
      const tagResult = tagIdStmt.get(tag);
      if (tagResult) {
        const linkStmt = db.prepare("INSERT INTO outfit_tags (outfit_id, tag_id) VALUES (?, ?)");
        linkStmt.run(outfitId, tagResult.id);
      }
    }

    revalidatePath('/outfits');
  } catch (error) {
    console.error("Error creating outfit:", error);
    throw new Error("Failed to create outfit.");
  }
  redirect('/outfits');
}

export async function getOutfits() {
  const { userId } = await auth(); 

  if (!userId) {
    return []; 
  }

  try {
    const stmt = db.prepare(`
      SELECT
        outfits.id,
        outfits.name,
        clothing_top.id AS top_id,
        clothing_top.name AS top_name,
        clothing_top.image AS top_image,
        clothing_bottom.id AS bottom_id,
        clothing_bottom.name AS bottom_name,
        clothing_bottom.image AS bottom_image,
        clothing_shoe.id AS shoe_id,
        clothing_shoe.name AS shoe_name,
        clothing_shoe.image AS shoe_image
      FROM outfits
      INNER JOIN clothing AS clothing_top ON outfits.top_id = clothing_top.id AND clothing_top.user_id = ?
      INNER JOIN clothing AS clothing_bottom ON outfits.bottom_id = clothing_bottom.id AND clothing_bottom.user_id = ?
      INNER JOIN clothing AS clothing_shoe ON outfits.shoe_id = clothing_shoe.id AND clothing_shoe.user_id = ?
      WHERE outfits.user_id = ?
    `);

    const outfits = stmt.all(userId, userId, userId, userId).map((row: any) => ({
      id: row.id.toString(),
      name: row.name,
      top: { id: row.top_id, name: row.top_name, image: row.top_image },
      bottom: { id: row.bottom_id, name: row.bottom_name, image: row.bottom_image },
      shoes: { id: row.shoe_id, name: row.shoe_name, image: row.shoe_image },
      tags: []
    }));

    for (const outfit of outfits) {
      const tagStmt = db.prepare(`
        SELECT tags.name FROM tags
        INNER JOIN outfit_tags ON tags.id = outfit_tags.tag_id
        WHERE outfit_tags.outfit_id = ?
      `);
      const tagResults = tagStmt.all(outfit.id);
      outfit.tags = tagResults.map((t: any) => t.name);
    }

    return outfits;
  } catch (error) {
    console.error("Error fetching outfits:", error);
    return [];
  }
}

export async function updateOutfitTags(outfitId: string, tags: string[]) {
  const { userId } = await auth(); 

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const deleteStmt = db.prepare("DELETE FROM outfit_tags WHERE outfit_id = ?");
    deleteStmt.run(outfitId);

    for (const tag of tags) {
      const tagStmt = db.prepare("INSERT INTO tags (name) VALUES (?) ON CONFLICT(name) DO NOTHING");
      tagStmt.run(tag);

      const tagIdStmt = db.prepare("SELECT id FROM tags WHERE name = ?");
      const tagResult = tagIdStmt.get(tag);
      if (tagResult) {
        const linkStmt = db.prepare("INSERT INTO outfit_tags (outfit_id, tag_id) VALUES (?, ?)");
        linkStmt.run(outfitId, tagResult.id);
      }
    }

    revalidatePath('/outfits');
  } catch (error) {
    console.error("Error updating outfit tags:", error);
    throw new Error("Failed to update outfit tags.");
  }
}

export async function deleteOutfit(outfitId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const stmt = db.prepare("DELETE FROM outfits WHERE id = ? AND user_id = ?");
    stmt.run(outfitId, userId);
    revalidatePath('/outfits');
  } catch (error) {
    console.error("Error deleting outfit:", error);
    throw new Error("Failed to delete outfit.");
  }
}
