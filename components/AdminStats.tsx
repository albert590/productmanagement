"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";

type Order = { id: string; productId: number; amount: number; customerId: string };

function readLocal<T>(key: string): T | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeLocal<T>(key: string, data: T) {
  try {
    if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

export default function AdminStats() {
  const { products, loading } = useProducts();
  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    if (loading) return;

    // Try to read existing mock orders / customers from localStorage
    let orders = readLocal<Order[]>("lancola_orders");
    let customers = readLocal<string[]>("lancola_customers");

    // If none exist, generate lightweight mock data for demo
    if (!orders || !customers) {
      const sampleCustomers: string[] = [];
      const sampleOrders: Order[] = [];

      // create up to 5 mock customers
      for (let i = 1; i <= Math.min(5, Math.max(1, products.length)); i++) {
        sampleCustomers.push(`cust-${i}`);
      }

      // create mock orders referencing up to 3 products each
      const count = Math.max(3, Math.min(12, products.length * 2));
      for (let i = 0; i < count; i++) {
        const product = products[i % products.length] || products[0];
        if (!product) break;
        sampleOrders.push({
          id: `ord-${i + 1}`,
          productId: product.id,
          amount: Math.floor(Math.random() * 3) + 1,
          customerId: sampleCustomers[i % sampleCustomers.length],
        });
      }

      orders = sampleOrders;
      customers = sampleCustomers;

      writeLocal("lancola_orders", orders);
      writeLocal("lancola_customers", customers);
    }

    setOrdersCount(orders.length);
    setCustomersCount(customers.length);
  }, [loading, products]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow animate-pulse h-24" />
        <div className="bg-white p-4 rounded shadow animate-pulse h-24" />
        <div className="bg-white p-4 rounded shadow animate-pulse h-24" />
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-slate-500">Products</div>
        <div className="text-2xl font-bold mt-2">{products.length}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-slate-500">Orders</div>
        <div className="text-2xl font-bold mt-2">{ordersCount}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-slate-500">Customers</div>
        <div className="text-2xl font-bold mt-2">{customersCount}</div>
      </div>
    </div>
  );
}
