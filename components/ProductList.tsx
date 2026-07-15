"use client";

import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, loading } = useProducts();

  console.log("LOADING STATUS:", loading);
  console.log("PRODUCT DATA:", products);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div>
      <h2>Total Products: {products.length}</h2>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}