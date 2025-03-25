// src/components/ClothingList.tsx
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import { deleteClothingItem } from "@/app/actions/clothingCreate";

interface ClothingItemProps {
  id: number;
  name: string;
  type: string;
  color: string;
  image: string;
  refreshClothingItems: () => void;
}

function ClothingItem({ id, name, type, color, image, refreshClothingItems }: ClothingItemProps) {
  return (
    <div key={id} className="border p-4 rounded-md shadow-sm relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from triggering any parent actions
        }}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item
                from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await deleteClothingItem(id);
                  refreshClothingItems();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </button>
      <div className="p-shadow-sm relative">
      <img src={image} alt={name} className="w-full h-68 object-cover mb-2 rounded-md" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>Type: {type}</p>
      <p>Color: {color}</p>
      </div>
    </div>
  );
}

interface ClothingListProps {
  clothingItems: any[];
  refreshClothingItems: () => void;
}

export function ClothingList({ clothingItems, refreshClothingItems }: ClothingListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {clothingItems.map((item) => (
        <ClothingItem key={item.id} {...item} refreshClothingItems={refreshClothingItems} />
      ))}
    </div>
  );
}