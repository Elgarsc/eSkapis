// src/components/AddItemForm.tsx
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import the server-side action
import { clothingCreate } from "@/app/actions/clothingCreate";

interface AddItemFormProps {
  refreshClothingItems: () => void;
}

export function AddItemForm({ refreshClothingItems }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"top" | "bottom" | "shoe" | "">("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    if (!image || !type || !name) {
      setError("Please complete all fields.");
      return;
    }

    // Call the server-side action to create the clothing item
    try {
      await clothingCreate(name, type, color, image);
      setName("");
      setType("");
      setColor("");
      setImage(null);
      refreshClothingItems(); // Refresh the clothing items after the new one is added
    } catch (err: any) {
      console.error("Failed to add clothing item:", err);
      setError(err.message || "Failed to add item."); // Display the error to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <Select value={type} onValueChange={(value) => setType(value as "top" | "bottom" | "shoe")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
            <SelectItem value="shoe">Shoes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
        <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Item color" />
      </div>

      <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        {
            isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <>
                    {image ? (
                        <img src={image} alt="Preview" className="max-h-40 mx-auto" />
                    ) : (
                        <p>Drag & drop an image here, or click to select a file</p>
                    )}
                </>
            )
        }
      </div>

      <Button type="submit">Add Item</Button>
    </form>
  );
}