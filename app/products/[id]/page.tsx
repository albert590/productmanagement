"use client";

import { useParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main>
      <h1>Product Details</h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          width: "400px",
        }}
      >
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt={product.title}
            width="200"
          />
        )}

        <h2>{product.title}</h2>

        <p>Category: {product.category}</p>

        <p>Price: ${product.price}</p>

        <p>Stock: {product.stock}</p>

        <p>{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: "20px",
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
