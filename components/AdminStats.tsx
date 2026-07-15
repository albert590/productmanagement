"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { getProductById } from "@/services/api";
type Order = {
  id: string;
  productId: number;
  amount: number;
  customerId: string;
};

function readLocal<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(key);

    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeLocal<T>(key: string, data: T) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        key,
        JSON.stringify(data)
      );
    }
  } catch {
    // Ignore local storage errors
  }
}

export default function AdminStats() {
  const { products, loading } = useProducts();

  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);


  useEffect(() => {
    if (loading || products.length === 0) return;

    let orders =
      readLocal<Order[]>("lancola_orders");

    let customers =
      readLocal<string[]>("lancola_customers");


    if (!orders || !customers) {

      customers = Array.from(
        {
          length: Math.min(5, products.length),
        },
        (_, index) =>
          `customer-${index + 1}`
      );


      orders = products
        .slice(0, 5)
        .map((product, index) => ({
          id: `order-${index + 1}`,
          productId: product.id,
          amount: index + 1,
          customerId:
            customers![index % customers!.length],
        }));


      writeLocal(
        "lancola_orders",
        orders
      );

      writeLocal(
        "lancola_customers",
        customers
      );
    }


    setOrdersCount(orders.length);
    setCustomersCount(customers.length);

  }, [loading, products]);



  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded shadow h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-slate-500">
          Products
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {products.length}
        </h2>
      </div>


      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-slate-500">
          Orders
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {ordersCount}
        </h2>
      </div>


      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-slate-500">
          Customers
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {customersCount}
        </h2>
      </div>

    </div>
  );
}