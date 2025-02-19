"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddItemFormProps = {
  refreshClothingItems: () => void; // Prop to trigger refresh
};

export function AddItemForm({ refreshClothingItems }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("default");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image || type === "default") {
      alert("Please complete all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("color", color);
    formData.append("image", image);

    try {
      const response = await fetch("/api/clothing", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Item added successfully");
        setName("");
        setType("default");
        setColor("");
        setImage(null);
        setPreview(null);
        refreshClothingItems(); // Refresh clothing list
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default" disabled>Select a Type</SelectItem>
            <SelectItem value="Top">Top</SelectItem>
            <SelectItem value="Bottom">Bottom</SelectItem>
            <SelectItem value="Shoes">Shoes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
        <Input id="color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Item color" />
      </div>

      <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
        ) : (
          <p>Drag & drop an image here, or click to select a file</p>
        )}
      </div>

      <Button type="submit">Add Item</Button>
    </form>
  );
}
