// components/clothing-list.tsx
import { X } from "lucide-react";

type ClothingItem = {
  id: string;
  name: string;
  type: string;
  color: string;
  picture: string;
};

type ClothingListProps = {
  items: ClothingItem[];
};

export function ClothingList({ items }: ClothingListProps) {
  if (items.length === 0) {
    return <p className="text-gray-500">No items found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="relative bg-white rounded-lg shadow-md p-4">
          {/* X button in the top right */}
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>

          <img src={item.picture} alt={item.name} className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
          <p className="text-sm text-gray-600">Type: {item.type}</p>
          <p className="text-sm text-gray-600">Color: {item.color}</p>
        </div>
      ))}
    </div>
  );
}

