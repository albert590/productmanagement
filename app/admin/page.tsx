"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useProducts } from "@/context/ProductContext";

export default function AdminPage() {
  const { products } = useProducts();

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  return (
    <ProtectedRoute>
      <main>
        <h1>Admin Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Total Products</h3>
            <h1>{products.length}</h1>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Categories</h3>
            <h1>{categories.length}</h1>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h3>Total Stock</h3>
            <h1>{totalStock}</h1>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
          }}
        >
          <h2>Welcome Admin</h2>

          <p>
            Manage products, inventory and system activities from this
            dashboard.
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}