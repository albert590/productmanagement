"use client";

import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.title}</h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-green-600 text-xl font-bold mt-3">
          ${product.price}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}