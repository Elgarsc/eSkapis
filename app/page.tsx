'use client'

import { Header } from "@/components/header"
import { ClothingList } from "@/components/clothing-list"
import { OutfitCreator } from "@/components/outfit-creator"
import { AddItemForm } from "@/components/add-item-form"
import { useState, useEffect } from "react"

// Fetch clothing items from the database
const fetchClothingItems = async () => {
  try {
    const response = await fetch("/api/clothing");

    if (!response.ok) {
      console.error("Failed to fetch items:", response.statusText);
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    return [];
  }
};

export default function Home() {
  const [clothingItems, setClothingItems] = useState([])

  const refreshClothingItems = async () => {
    const items = await fetchClothingItems();
    setClothingItems(items);
  };

  useEffect(() => {
    refreshClothingItems(); // Initial load
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Create Outfit</h2>
            <OutfitCreator clothingItems={clothingItems} />
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">My Closet</h2>
            <ClothingList items={clothingItems} />
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Add New Item</h2>
            <AddItemForm refreshClothingItems={refreshClothingItems} />
          </section>
        </div>
      </main>
    </div>
  )
}

